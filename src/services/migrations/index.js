import { Alert } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const DATABASE_NAME = "ReactNativetest.db";
const DATABASE_VERSION = 1;
const DATABASE_DISPLAYNAME = "React Native Test Database";
const DATABASE_SIZE = 200000;

// Schéma initial (Version 0)
const v0Schema = [
    `CREATE TABLE IF NOT EXISTS OperateurLiked (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        operateur_id INTEGER NOT NULL UNIQUE,
        nom TEXT NOT NULL,
        adresse TEXT,
        domaine_activite TEXT,
        date_ajout DATETIME DEFAULT CURRENT_TIMESTAMP
    )`
];

const migrationScripts = {
    0: [
        // Migrations futures si nécessaire
    ],
};

let db = null;

export const initDatabase = async () => {
    return new Promise((resolve, reject) => {
        SQLite.openDatabase(
            { name: DATABASE_NAME, location: 'default' },
            (openedDb) => {
                db = openedDb;
                console.log("Database opened successfully.");
                performMigrations(resolve, reject);
            },
            error => {
                console.error("Error opening database: ", error);
                reject(error);
            }
        );
    });
};

const performMigrations = (resolve, reject) => {
    if (!db) {
        console.error("Database not open for migration!");
        reject(new Error("Database not open"));
        return;
    }

    db.transaction(
        (txn) => {
            // Créer la table de migrations si elle n'existe pas
            txn.executeSql(
                "CREATE TABLE IF NOT EXISTS _migrations (version INTEGER PRIMARY KEY, applied_at DATETIME DEFAULT CURRENT_TIMESTAMP)",
                [],
                () => {
                    console.log("Migration table created/verified");
                    
                    // Vérifier la version actuelle
                    txn.executeSql(
                        "SELECT version FROM _migrations ORDER BY version DESC LIMIT 1",
                        [],
                        (txn, results) => {
                            let currentDbVersion = 0;
                            if (results.rows.length > 0) {
                                currentDbVersion = results.rows.item(0).version;
                            }
                            
                            console.log(`Current database version: ${currentDbVersion}`);
                            console.log(`Target database version: ${DATABASE_VERSION}`);

                            // Si la base est neuve, appliquer le schéma initial
                            if (currentDbVersion === 0) {
                                console.log("Applying initial schema...");
                                executeSchemaStatements(txn, v0Schema, 0);
                            } else if (currentDbVersion < DATABASE_VERSION) {
                                // Appliquer les migrations nécessaires
                                applyMigrations(txn, currentDbVersion);
                            } else {
                                console.log("Database is up to date");
                            }
                        },
                        (txn, error) => {
                            // Table vide, considérer comme version 0
                            console.log("Migration table is empty, applying initial schema...");
                            executeSchemaStatements(txn, v0Schema, 0);
                        }
                    );
                },
                (txn, error) => {
                    console.error("Error creating migration table: ", error);
                }
            );
        },
        (error) => {
            console.error("Migration transaction failed: ", error);
            reject(error);
        },
        () => {
            console.log("Migration completed successfully");
            resolve();
        }
    );
};

const executeSchemaStatements = (txn, statements, version) => {
    let currentIndex = 0;
    
    const executeNext = () => {
        if (currentIndex >= statements.length) {
            // Tous les statements exécutés, marquer la version comme appliquée
            txn.executeSql(
                "INSERT OR REPLACE INTO _migrations (version) VALUES (?)",
                [version],
                () => {
                    console.log(`Schema version ${version} applied successfully`);
                },
                (txn, error) => {
                    console.error(`Error marking version ${version} as applied:`, error);
                }
            );
            return;
        }
        
        const statement = statements[currentIndex].trim();
        if (statement) {
            txn.executeSql(
                statement,
                [],
                () => {
                    console.log(`Statement ${currentIndex + 1}/${statements.length} executed`);
                    currentIndex++;
                    executeNext();
                },
                (txn, error) => {
                    console.error(`Error executing statement ${currentIndex + 1}:`, error);
                    console.error("Statement was:", statement);
                    currentIndex++;
                    executeNext(); // Continue même en cas d'erreur
                }
            );
        } else {
            currentIndex++;
            executeNext();
        }
    };
    
    executeNext();
};

const applyMigrations = (txn, currentVersion) => {
    // Pour les futures migrations
    for (let version = currentVersion + 1; version <= DATABASE_VERSION; version++) {
        if (migrationScripts[version]) {
            executeSchemaStatements(txn, migrationScripts[version], version);
        }
    }
};

// Ajouter un opérateur aux favoris
export const likeOperateur = (operateurData) => {
    return new Promise((resolve, reject) => {
        if (!db) {
            reject(new Error("Database not initialized"));
            return;
        }

        const nom = operateurData.raisonSociale || operateurData.denominationcourante || "Non spécifié";
        const adresse = operateurData.adressesOperateurs?.[0] ? 
            `${operateurData.adressesOperateurs[0].lieu || ''}, ${operateurData.adressesOperateurs[0].ville || ''} ${operateurData.adressesOperateurs[0].codePostal || ''}`.trim() : 
            "Non spécifiée";
        const domaineActivite = operateurData.activites?.[0]?.nom || "Non spécifié";

        db.transaction(txn => {
            txn.executeSql(
                "INSERT OR REPLACE INTO OperateurLiked (operateur_id, nom, adresse, domaine_activite) VALUES (?,?,?,?)",
                [operateurData.id, nom, adresse, domaineActivite],
                (txn, results) => {
                    console.log("Opérateur ajouté aux favoris: ", nom);
                    resolve(true);
                },
                (txn, error) => {
                    console.error("Erreur lors de l'ajout aux favoris: ", error);
                    reject(error);
                }
            );
        });
    });
};

// Retirer un opérateur des favoris
export const unlikeOperateur = (operateurId) => {
    return new Promise((resolve, reject) => {
        if (!db) {
            reject(new Error("Database not initialized"));
            return;
        }

        db.transaction(txn => {
            txn.executeSql(
                "DELETE FROM OperateurLiked WHERE operateur_id = ?",
                [operateurId],
                (txn, results) => {
                    if (results.rowsAffected > 0) {
                        console.log("Opérateur retiré des favoris: ", operateurId);
                        resolve(true);
                    } else {
                        console.log("Opérateur non trouvé dans les favoris.");
                        resolve(false);
                    }
                },
                (txn, error) => {
                    console.error("Erreur lors de la suppression des favoris: ", error);
                    reject(error);
                }
            );
        });
    });
};

// Vérifier si un opérateur est dans les favoris
export const isOperateurLiked = (operateurId) => {
    return new Promise((resolve, reject) => {
        if (!db) {
            reject(new Error("Database not initialized"));
            return;
        }

        db.transaction(txn => {
            txn.executeSql(
                "SELECT COUNT(*) as count FROM OperateurLiked WHERE operateur_id = ?",
                [operateurId],
                (txn, results) => {
                    const count = results.rows.item(0).count;
                    resolve(count > 0);
                },
                (txn, error) => {
                    console.error("Erreur lors de la vérification des favoris: ", error);
                    reject(error);
                }
            );
        });
    });
};

// Récupérer tous les opérateurs likés
export const getLikedOperateurs = () => {
    return new Promise((resolve, reject) => {
        if (!db) {
            reject(new Error("Database not initialized"));
            return;
        }

        db.transaction(txn => {
            txn.executeSql(
                "SELECT * FROM OperateurLiked ORDER BY date_ajout DESC",
                [],
                (txn, results) => {
                    let operateurs = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        operateurs.push(results.rows.item(i));
                    }
                    console.log(`Retrieved ${operateurs.length} liked operateurs`);
                    resolve(operateurs);
                },
                (txn, error) => {
                    console.error("Erreur lors de la récupération des favoris: ", error);
                    reject(error);
                }
            );
        });
    });
};

// Vider tous les favoris
export const clearAllLikedOperateurs = () => {
    return new Promise((resolve, reject) => {
        if (!db) {
            reject(new Error("Database not initialized"));
            return;
        }

        db.transaction(txn => {
            txn.executeSql(
                "DELETE FROM OperateurLiked",
                [],
                (txn, results) => {
                    console.log("Tous les favoris ont été supprimés.");
                    resolve(true);
                },
                (txn, error) => {
                    console.error("Erreur lors de la suppression de tous les favoris: ", error);
                    reject(error);
                }
            );
        });
    });
};

export const closeDatabase = () => {
    if (db) {
        console.log("Closing database.");
        db.close(
            () => console.log("Database closed successfully!"),
            error => console.error("Error closing database: ", error)
        );
    }
};
