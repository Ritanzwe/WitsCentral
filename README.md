# WitsCentral

**Overview:**  
WitsCentral is an online platform designed exclusively for Wits University students. It aims to create a dynamic community where students can easily buy and sell goods, access services, participate in events, and seek counseling support. The platform leverages the MERN stack (MongoDB, Express.js, React, Node.js) integrated with Azure cloud services to provide a secure, scalable, and user-friendly experience.

## Platform Features

### Marketplace
- A secure online marketplace for students to buy and sell various items like books, second-hand electronics, event tickets, and more.
- Users can post listings with item details, photos, prices, and contact information.
- Filters and search functionality to easily find items by category, price, or location.

### Student Forum
- A community forum for students to ask questions, share advice, and discuss topics related to academics, campus life, and more.
- Features include creating posts, commenting, liking, and flagging inappropriate content.

### Service Listings
- Students can offer and find services such as tutoring, event promotion, or hiring graduate photographers.
- Service providers can create detailed profiles, list services, set rates, and receive reviews.

### Event Promotion and Ticketing
- A dedicated space for creating and promoting campus events.
- Integrated ticketing system to sell and manage event tickets.
- RSVP and event reminders to keep attendees informed.

### Counseling and Support Services
- Counseling service where students can book appointments with campus counselors.
- Options for online or in-person sessions with secure messaging for follow-ups.
- Resources and articles on mental health, study tips, stress management, and more.

### Local Pickup and Delivery
- Flexible options for users to choose local pickup or delivery for purchased items.
- Integration with local delivery services for convenient item dispatch.

### Real-Time Chat and Notifications
- Real-time chat functionality to facilitate communication between buyers and sellers or students and service providers.
- Notifications for new messages, event updates, item listings, and more.

## Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js with Express.js
- **Database:** MongoDB (via Azure Cosmos DB)
- **Cloud Platform:** Azure (for hosting, storage, authentication, and other services)

## Architecture Overview

### Frontend - React.js
- **Components:**
  - Marketplace Component: For listing items and purchasing.
  - Forum Component: For Q&A and discussions.
  - Services Component: For browsing and offering services.
  - Events Component: For event creation, promotion, and ticketing.
  - Counseling Component: For booking appointments and accessing mental health resources.
  - User Profile Component: For managing personal information, listings, and transactions.
  - Chat Component: For real-time communication.
- **State Management:** Using Context API or Redux.
- **Routing:** Implemented using React Router.

### Backend - Node.js and Express.js
- **RESTful API Endpoints:**
  - User Authentication: Sign-up, login, password reset (integrated with Azure AD B2C).
  - CRUD operations: For listings, forum posts, services, events, and counseling appointments.
  - Real-Time Communication: WebSocket API for chat and notifications.
- **Middleware:**
  - Authentication and authorization (using JWT or OAuth).
  - Error handling and logging.


### Azure Cloud Services
- **Azure App Service:** Hosts the Node.js backend API.
- **Azure Static Web Apps:** Hosts the React frontend.

- **Azure Blob Storage:** Manages media uploads, including item photos, documents, and resources.
- **Azure AD B2C:** Provides secure user authentication and management.
- **Azure Functions:** Handles serverless tasks like notifications, automated emails, and other background jobs.
- **Azure Logic Apps:** Automates workflows (e.g., sending reminders for counseling appointments or event RSVPs).
- **Azure Communication Services:** Enables real-time chat and notification features.
- **Azure CDN:** Distributes static content to ensure fast delivery and reduced latency.

## Key Development Steps

1. **Set Up Azure Services:**
   - Provision necessary Azure resources (App Service, Static Web Apps, Cosmos DB, Blob Storage, Azure Functions, Azure AD B2C, etc.).
   - Configure environment variables for secure management of secrets and keys.

2. **Develop Frontend with React:**
   - Create reusable UI components (marketplace, forum, services, events, counseling).
   - Implement state management and routing.
   - Integrate with Azure AD B2C for authentication.
   - Connect to the backend API and Azure services (e.g., Blob Storage for media handling).

3. **Build Backend with Node.js and Express:**
   - Develop RESTful APIs for all required functionalities (listings, forums, services, events, counseling).
   - Implement middleware for authentication, authorization, and data validation.
   - Connect the backend to Azure Cosmos DB for database operations.

4. **Integrate Counseling Services:**
   - Create a dedicated component for booking and managing counseling appointments.
   - Set up secure messaging and communication features via Azure Communication Services.
   - Add educational resources, articles, and support links.

5. **Implement Real-Time Features:**
   - Develop WebSocket or Azure SignalR services for chat and notifications.
   - Integrate Azure Functions for serverless tasks (e.g., notifications, email alerts).

6. **Test and Deploy:**
   - Write unit and integration tests for both frontend and backend components.
   - Deploy the application to Azure using CI/CD pipelines via GitHub or Azure DevOps.
   - Monitor and optimize performance using Azure monitoring tools.

## Conclusion

WitsCentral aims to enhance the student experience at Wits University by creating an interconnected platform where students can buy, sell, communicate, and access services efficiently. With the power of the MERN stack and Azure's cloud capabilities, WitsCentral will provide a secure, scalable, and robust solution for all its users.
