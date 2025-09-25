/**
 * This Express.js server provides email validation functionality.
 *
 * Features:
 * 1. Serves static files (HTML, CSS, JS, images) from the "public" directory.
 * 2. Parses both URL-encoded form submissions and JSON request bodies.
 * 3. Defines a POST route at "/email" that:
 *    - Extracts an email from the request body.
 *    - Validates the email using a regular expression for standard formats.
 *    - If valid: responds with an HTML form field showing a success alert.
 *    - If invalid: responds with an HTML form field showing an error alert.
 *    - Uses HTMX attributes (`hx-target`, `hx-swap`, `hx-post`) so the
 *      response replaces the form field dynamically without reloading the page.
 * 4. Starts the server on port 3000 and logs a confirmation message.
 *
 * Goal:
 * To demonstrate how an Express server can handle form submissions,
 * perform server-side validation, and return dynamic HTML fragments
 * for immediate client-side updates.
 */

// Import the 'express' module to create a web server
import express from 'express';

// Create an instance of an Express application
const app = express();

// ----------------------
// Middleware
// ----------------------

// Serve static files (HTML, CSS, JS, images) from the 'public' folder
app.use(express.static('public'));

// Parse URL-encoded bodies (from HTML form submissions)
// 'extended: true' allows nested objects/arrays
app.use(express.urlencoded({ extended: true }));

// Parse JSON request bodies (useful for API clients or fetch calls)
app.use(express.json());

// ----------------------
// Handle POST request to validate email
// ----------------------
app.post('/email', (req, res) => {
    // Extract submitted email from form body
    const submittedEmail = req.body.email;

    // Regular expression to validate standard email formats
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // If the email matches the regex, return success response
    if (emailRegex.test(submittedEmail)) {
        return res.send(`
            <div class="mb-3" hx-target="this" hx-swap="outerHTML">
                <label class="form-label">Email address</label>
                <input
                    type="email"
                    class="form-control"
                    name="email"
                    hx-post="/email"
                    value="${submittedEmail}"
                >
                <div class="alert alert-success" role="alert">
                    That email is valid
                </div>
            </div>
        `);
    }
    // If the email is invalid, return error response
    else {
        return res.send(`
            <div class="mb-3" hx-target="this" hx-swap="outerHTML">
                <label class="form-label">Email address</label>
                <input
                    type="email"
                    class="form-control"
                    name="email"
                    hx-post="/email"
                    value="${submittedEmail}"
                >
                <div class="alert alert-danger" role="alert">
                    Please enter a valid email address
                </div>
            </div>
        `);
    }
});

// ----------------------
// Start the server
// ----------------------
// Listen on port 3000 and log a message when running
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
