const mistral = require('@mistralai/mistralai')

const apiKey ='z1cCivX0ibPDNvH5d3ANqj9dVHa4AT8r';

const client = new mistral.Mistral({apiKey: apiKey});

async function fetchData() {
    try {
      // Send a GET request
      const response = await fetch(url);
      // Check if the request was successful
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Parse the response as JSON and store it in a variable
      const data = await response.json();
      return data; // Return the data to be used elsewhere
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      return null; // Return null in case of an error
    }

  }
  
  // Use the fetchData function
  async function Mat() {
    var fetchedData = await fetchData(); // Store the fetched data in a variable
    console.log(fetchedData); // Log the fetched data
    
    const chatResponse = await client.chat.complete({
        model: 'open-mistral-7b',
        messages: [{role: 'user', content: `Causes and Prevention of ${response.data[0]} and also give fertilizers and chemicals to combat it.`}],
      });
      
      console.log('Chat:', chatResponse.choices[0].message.content);
      return chatResponse.choices[0].message.content
  }

export default function Fat(){
    
    const chatResponse =  client.chat.complete({
        model: 'open-mistral-7b',
        messages: [{role: 'user', content: `Causes and Prevention of ${fetchedData['Severity']} and also give fertilizers and chemicals to combat it.`}],
      });
    
      console.log('Chat:', chatResponse.choices[0].message.content);
      return chatResponse.choices[0].message.content
  }