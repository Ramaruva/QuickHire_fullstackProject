
# QuickHire - Short-Term Employment Platform

**QuickHire** is a platform designed to connect employers and employees for short-term employment opportunities. It provides a user-friendly interface and efficient backend support for managing job postings and applications.

---

## 🚀 Features
- **Employer Dashboard**: Post and manage job listings.
- **Employee Portal**: Create profiles, browse jobs, and apply seamlessly.
- **User Authentication**: Secure login and role-based access.
- **Responsive UI**: Fully optimized for desktops and mobile devices.

---

## 🛠️ Technologies Used

### Frontend
- **React**: For building dynamic and interactive user interfaces.
- **Tailwind CSS**: For styling.
- **Redux**: For state management.
- **Vite**: For fast and efficient builds.
- **JavaScript/JSX**: For application logic and structure.

### Backend
- **Java**: Core programming language.
- **Spring Boot**: Backend framework for RESTful API development.
- **MySQL**: Relational database for persistent data storage.

---

## 📂 Project Structure

### Backend
```
backend/
├── .gitignore               # Git-specific ignored files
├── .idea/                   # IntelliJ IDEA configuration files
├── .mvn/                    # Maven wrapper files
├── mvnw                     # Maven wrapper for Linux/Mac
├── mvnw.cmd                 # Maven wrapper for Windows
├── pom.xml                  # Maven configuration
├── src/                     # Source code directory
│   ├── main/
│   │   ├── java/com/example/quickhire/ # Backend logic and REST API definitions
│   │   └── resources/                  # Application properties and configurations
│   └── test/                           # Unit tests
└── target/                  # Build artifacts
```

### Frontend
```
frontend/
├── .contentlayer/           # Static content files
├── .eslintrc.cjs            # ESLint configuration
├── .gitignore               # Git-specific ignored files
├── index.html               # Entry point for the app
├── node_modules/            # Installed npm packages
├── package.json             # Project metadata and dependencies
├── postcss.config.js        # PostCSS configuration
├── public/                  # Public static assets
├── src/                     # Source code directory
│   ├── API/                 # API utilities
│   ├── App.jsx              # Root React component
│   ├── auth/                # Authentication logic
│   ├── components/          # Reusable UI components
│   ├── customHooks/         # Custom React hooks
│   ├── globals.css          # Global CSS styles
│   ├── localStorage.js      # Utility for managing localStorage
│   ├── main.jsx             # Main entry point for React
│   ├── pages/               # Page-specific React components
│   ├── redux/               # State management setup
│   ├── types.js             # Type definitions
│   └── validations/         # Input validation logic
├── tailwind.config.js       # Tailwind CSS configuration
└── vite.config.js           # Vite configuration
```

---

## ⚙️ Setup Instructions

### Prerequisites
- **Node.js** (v14 or above)
- **Java** (JDK 17 or above)

### Steps to Run

#### 1. Clone the Repository
```bash
git clone https://github.com/your-username/QuickHire.git
cd QuickHire
```

#### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend/quickhirebackend
   ```
2. Install dependencies and run the application:
   ```bash
   ./mvnw spring-boot:run
   ```

#### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

#### 4. Access the Application
- Open your browser and navigate to [http://localhost:5173](http://localhost:5173).

---

## 🤝 Contribution Guidelines
- Fork the repository and create a feature branch.
- Ensure code follows standards defined in `.eslintrc.cjs`.
- Submit a descriptive pull request for your changes.

---



## 👥 Contributors
- **Ramakrishna** - Full-Stack Developer.
- **Gowtham Dongari** - Software Engineer.
- **JayaSri Payili** - Software Engineer

---

## 📧 Contact
For queries or feedback, email [ramaruva54@gmail.com].
