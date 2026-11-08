/**
 * Guest messages for Tarek & Alaa's wedding invitation.
 *
 * Paste this into Extensions > Apps Script of a Google Sheet, then deploy it as a
 * web app (Execute as: Me, Who has access: Anyone). Each message becomes a row.
 * To remove a message, delete its row. To hide one but keep it, set "Show" to FALSE.
 */

var SHEET_NAME = 'Messages';
var MAX_NAME = 40;
var MAX_MESSAGE = 400;
var MAX_RETURNED = 200;

function getSheet_() {
  var book = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = book.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = book.insertSheet(SHEET_NAME);
    sheet.appendRow(['Time', 'Name', 'Message', 'Language', 'Show']);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function json_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// The site reads the messages with a GET request.
function doGet() {
  var sheet = getSheet_();
  var rows = sheet.getLastRow() > 1
    ? sheet.getRange(2, 1, sheet.getLastRow() - 1, 5).getValues()
    : [];

  var messages = rows
    .filter(function (r) { return r[1] && r[2] && r[4] !== false && String(r[4]).toUpperCase() !== 'FALSE'; })
    .map(function (r) {
      return { time: new Date(r[0]).toISOString(), name: String(r[1]), message: String(r[2]) };
    })
    .reverse()
    .slice(0, MAX_RETURNED);

  return json_({ ok: true, messages: messages });
}

// The site sends a new message with a POST request.
function doPost(e) {
  var data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return json_({ ok: false, error: 'bad-request' });
  }

  // A hidden field that people never fill in, but spam robots do.
  if (data.website) return json_({ ok: true });

  var name = String(data.name || '').trim().slice(0, MAX_NAME);
  var message = String(data.message || '').trim().slice(0, MAX_MESSAGE);
  var language = data.lang === 'ar' ? 'ar' : 'en';
  if (!name || !message) return json_({ ok: false, error: 'missing' });

  // Stop formulas from running if someone types one into a message.
  if (/^[=+\-@]/.test(name)) name = "'" + name;
  if (/^[=+\-@]/.test(message)) message = "'" + message;

  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var now = new Date();
    getSheet_().appendRow([now, name, message, language, true]);
    return json_({
      ok: true,
      message: { time: now.toISOString(), name: name.replace(/^'/, ''), message: message.replace(/^'/, '') }
    });
  } finally {
    lock.releaseLock();
  }
}
