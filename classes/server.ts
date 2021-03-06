import express, { Application } from 'express';
import cors from 'cors';
import { UserInstance } from '../db/models';

// Database
import db from '../db/connections';

// Routes
import {
    authRoutes,
    usersRoutes,
} from '../routes';

// Add properties to Request
declare module 'express-serve-static-core' {
    interface Request {
        user: UserInstance
    }
    // tslint:disable-next-line: no-empty-interface
    interface Response {}
}


class Server {

    private app: Application;
    private port: string;
    private paths;
    private apiVersion = '/api/v1';

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8010';

        // Add new routes
        this.paths = {
            auth: this.apiVersion,
            users: this.apiVersion + '/users',
        };

        // Conectar DB
        this.dbConnection();

        // Middelwares
        this.middlewares();

        // Rutas
        this.routes();
    }

    async dbConnection(): Promise<void> {

        try {
            // Test connection
            await db.authenticate();
            console.log('Database online');

            await db.sync();
            // await db.sync({ alter: true });

        } catch (error: any) {
            throw new Error( error );
        }

    }

    middlewares(): void {
        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio publico
        this.app.use( express.static('public') );

    }

    routes(): void {
        this.app.use( this.paths.auth , authRoutes );
        this.app.use( this.paths.users , usersRoutes );
    }

    listen(): void {
        this.app.listen(this.port, () => {
            console.log('Working on port: ', this.port);
        });
    }

}

export default Server;
