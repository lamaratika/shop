export function cssHomePage(): string {
    return `
@import "tailwindcss";
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
    color: #333;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  header {
    background-color: #4CAF50;
    color: white;
    padding: 10px 0;
    text-align: center;
  }
  main {
    padding: 20px;
    max-width: 800px;
    margin: 20px auto;
    background: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: center;
  }
  h1 {
    color: #4CAF50;
  }
  a {
    color: #4CAF50;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  footer {
    text-align: center;
    padding: 10px 0;
    background-color: #f4f4f4;
    color: #777;
    position: fixed;
    width: 100%;
    bottom: 0;
    box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
  }
  `;
}
