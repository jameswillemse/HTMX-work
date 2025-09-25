/**
 * This Express.js server provides a simple user search feature.
 *
 * Features:
 * 1. Serves static files (HTML, CSS, JS, images) from the "public" directory.
 * 2. Parses both URL-encoded form submissions and JSON request bodies.
 * 3. Defines a POST route at "/search" that:
 *    - Extracts a search term from the request body.
 *    - Fetches a list of users from the JSONPlaceholder API.
 *    - Filters users whose name or email contains the search term (case-insensitive).
 *    - Returns matching results as HTML <tr> elements for use in a table.
 *    - If no search term is provided, returns an empty row.
 * 4. Starts the server on port 3000 and logs a confirmation message.
 *
 * Goal:
 * To demonstrate how an Express server can handle form submissions,
 * fetch and filter external API data, and return dynamic HTML for rendering
 * in the client’s UI (such as updating a search results table).
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

// Parse URL-encoded bodies (from HTML forms)
// 'extended: true' allows rich/nested form data
app.use(express.urlencoded({ extended: true }));

// Parse JSON request bodies (useful for API requests)
app.use(express.json());

// ----------------------
// Handle POST request for searching users
// ----------------------
app.post('/search', async (req, res) => {
    // Extract the search term from request body and make it lowercase
    const searchTerm = req.body.search.toLowerCase();

    // If no search term is provided, return an empty table row
    if (!searchTerm) {
        return res.send('<tr></tr>');
    }

    // Fetch user data from the JSONPlaceholder API (fake API for testing)
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const users = await response.json();

    // Filter users whose name or email includes the search term
    const searchResults = users.filter((user) => {
        const name = user.name.toLowerCase();
        const email = user.email.toLowerCase();
        return name.includes(searchTerm) || email.includes(searchTerm);
    });

    // Convert the filtered results into HTML table rows
    const searchResultHtml = searchResults
        .map((user) => `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
            </tr>
        `)
        .join('');

    // Send the generated HTML back as the response
    res.send(searchResultHtml);
});

// ----------------------
// Start the server
// ----------------------
// Listen on port 3000 and log a message when the server is running
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
