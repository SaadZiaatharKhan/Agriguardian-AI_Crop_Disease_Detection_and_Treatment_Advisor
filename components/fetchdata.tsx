"use server"

export default async function FetchData(){
    try {
        // Fetch data from the endpoint
        const result = await fetch('http://localhost:8000/final');
        
        // Parse the response to JSON
        const data = await result.json();
        
        console.log('Data:', data);
        
        // Return the plain JavaScript object
        return data;
    } catch (error) {
        console.error('Error:', error);
        return { error: 'Failed to fetch data' };
    }
};
