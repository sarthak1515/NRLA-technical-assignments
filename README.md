# NRLA Technical-Assignments

## 1- Clock & Weather Widget

### Overview

This Angular application displays a functional analogue clock with integrated current weather information. The clock synchronizes with the system time, and the weather is fetched from the OpenWeather API.

### Prerequisites

- Node.js >= 20
- Angular CLI
- OpenWeather API Key
  Create a free account at https://openweathermap.org
  Generate an API key

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd <your-repo-folder>
   ```
2. **Install dependencies**

```bash
 npm ci
```

3. **Update the environment file with Open Weather api key : `src/environments/environment.ts` (Temp. for local testing only)**

4. **Start the Angular application-(npm start)**

### Enhancements / Future Improvements

1- Add internalization (i18n) for multiple languages.

2- Complete accessibility improvements.

3- GitHub Actions (GHA) for CI/CD.
