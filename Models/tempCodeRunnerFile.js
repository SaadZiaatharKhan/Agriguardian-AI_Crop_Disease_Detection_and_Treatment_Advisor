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
async function main() {
  const fetchedData = await fetchData(); // Store the fetched data in a variable
  console.log(fetchedData['Severity']); // Log the fetched data
}

// Call the main function
main();