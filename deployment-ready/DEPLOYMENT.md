# ILSD shared-hosting deployment

ILSD is deployed as a static React/Vite frontend plus a PHP 8+/MySQL backend. Node.js is needed only on the development machine to create the frontend build; the hosting server needs Apache, PHP, and MySQL only.

## 1. Build locally

From `client/`:

```text
npm install
npm run lint
npm run build
```

The production frontend is generated in `client/dist/`.

The default production API path is `/server`, which keeps the frontend and PHP API on the same domain. If the API is installed at another path, set `VITE_API_URL` before building.

## 2. Upload structure

Upload the contents of `client/dist/` into the hosting account's `public_html/` directory. The build contains the root `.htaccess` copied from `client/public/.htaccess`.

Upload the `server/` directory beside the frontend build:

```text
public_html/
├── .htaccess
├── index.html
├── assets/
├── favicon.png
└── server/
    ├── .htaccess
    ├── auth/
    ├── config/
    ├── newsletter/
    ├── posts/
    └── uploads/
```

Do not upload `client/node_modules`, React source files, local `.env` files, `.git`, ZIP archives, or test files.

## 3. Create the database

Create a MySQL database and database user in the hosting control panel. Grant that user all required privileges on the new database. Import `server/migrate.sql` from the source project, or `database-schema.sql` from the prepared deployment package, through phpMyAdmin or the hosting database tool. The migration creates tables without dropping existing data and does not create a default password.

Required tables:

- `users`
- `posts`
- `post_files`
- `newsletter`

## 4. Configure PHP database access

Copy `server/config/db.local.php.example` to `server/config/db.local.php` on the server and replace the placeholders with the hosting credentials. This file is excluded from version control and is denied by Apache.

Alternatively, configure `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, and `DB_PASS` as PHP process environment variables if the hosting provider supports them.

## 5. Create the single administrator

Generate a password hash locally:

```text
php -r "echo password_hash('REPLACE_WITH_A_NEW_PASSWORD', PASSWORD_DEFAULT), PHP_EOL;"
```

Insert the result through phpMyAdmin:

```sql
INSERT INTO users (email, password)
VALUES ('admin@example.com', 'PASTE_GENERATED_HASH_HERE');
```

Do not place the password in React, `.env` files, Git, or the public hosting directory.

## 6. Permissions

Use the hosting provider's normal permissions. PHP must be able to write to `server/uploads/`; the directory should not be world-writable. Do not remove the `server/uploads/.htaccess` file.

## 7. Functional checks

Verify the following after upload:

1. `/`, `/about`, `/services`, `/news`, `/faq`, and `/contact` load directly.
2. `/news/<slug>` loads after a browser refresh.
3. English and Amharic switching work.
4. `/admin/login` accepts the created administrator.
5. The administrator can create, edit, publish, unpublish, and delete posts.
6. Image, video, and PDF attachments upload and display.
7. Newsletter subscription succeeds and duplicate emails do not fail.
8. Logout prevents access to protected admin actions.
9. Unpublished posts are not visible through public list/detail requests.

## 8. Troubleshooting

- A React route returning 404 usually means the root `.htaccess` was not uploaded or Apache rewrite support is disabled.
- A database error means `server/config/db.local.php` or the PHP environment variables do not match the hosting database.
- Upload failures usually indicate insufficient `server/uploads/` permissions or a hosting PHP upload-size limit below the application limit.
- If the frontend calls the wrong API path, rebuild after setting `VITE_API_URL`.
- If sessions do not persist, confirm HTTPS, cookies, the hosting domain, and that the browser is not blocking cookies.

## Security notes

The API uses prepared statements, password hashing, HTTP-only sessions, same-site cookies, generic production database errors, and upload-directory protection. The hosting account should use HTTPS, and the administrator password should be unique and changed if it was ever exposed during development.
