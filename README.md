# Asia Global Textiles Website

Professional brand website for Asia Global Textiles.

## Structure

- `frontend` - Vite + React website.
- `backend` - Placeholder for future backend work.

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Current pages:

- Landing page
- Contact page with `info@asiaglobaltex.com`
- About Us, Services, and Products pages marked as coming soon

## Deployment

The frontend is deployed to an Ubuntu EC2 instance with Nginx.

Current server:

- Public IP: `54.159.150.200`
- SSH user: `ubuntu`
- Web root: `/var/www/asia-global-textiles`
- Nginx config: `deploy/nginx/asia-global-textiles.conf`

GitHub Actions workflow:

- `.github/workflows/deploy-frontend.yml`
- Runs on pushes to `main`
- Builds `frontend`
- Uploads `frontend/dist` to EC2
- Publishes the files to the Nginx web root

Required GitHub repository secrets:

```txt
EC2_HOST=54.159.150.200
EC2_USER=ubuntu
EC2_PORT=22
DEPLOY_PATH=/var/www/asia-global-textiles
EC2_SSH_KEY=<full private key contents from asiaglobal.pem>
```

Cloudflare and domain/SSL setup should be done after the GitHub secrets are configured and the workflow deploys successfully.
