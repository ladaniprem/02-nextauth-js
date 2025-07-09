import mongoose from 'mongoose';

// Note :- date base dusare content me hai aur data ko granty nahi hai to await ,async ka use nahi kiya hai
 
export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log('Database connected successfully');
        });

        connection.on('error', (err: Error) => {
            console.log(`Database connection error: ${err}`);
            process.exit();
        });
        
    } catch (error) {
        console.log(`Error connecting to the database: ${error}`);
    }
}