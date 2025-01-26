
import Account from "../../database/models/Account.js";


/**
 * Creates a new account in the database.
 * 
 * @param {Object} options The JSON passed to the server.
 * @param {String} options.username The username of the account.
 * @param {String} options.password The password of the account.
 */
export async function createAccount(options) {
  if (await hasAccount(options.username))
    throw new Error(`Account ${options.username} already exists.`);

  const account = new Account({
    username: options.username,
    password: options.password,
  });

  await account.save();
  console.log(`Created account for ${account.username}.`);

  return account;
}


/**
 * Determines if the account already exists in the database.
 * 
 * @param {String} username The username of the account.
 */
async function hasAccount(username) {
  const existingAccounts = await Account.find({ username });
  return existingAccounts.length !== 0;
}


/**
 * Verifies if the account credentials are correct.
 * 
 * @param {Object} options The JSON passed to the server.
 * @param {String} options.username The username of the account.
 * @param {String} options.password The password of the account.
 */
export async function verifyAccount(options) {
  const accounts = await Account.find({
    username: options.username,
    password: options.password,
  });
  return accounts.length !== 0;
}

