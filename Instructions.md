This is a project for Patent Gap. 

# Instructions

- Please complete as much of the work as possible within the given time frame.
- For any images/assets, please refer to the [Assets](./Assets/) folder.
- For any API Keys/Environment variables, please contact me.
- Create a new branch from the main branch for your individual work and use sub-branches from your branch as and when required. 
- Please follow the pattern **firstname-lastname** for your individual branch. Feel free to use appropriate names for sub branches.
- At the end of your work, make sure that all your branches are merged into a single branch under your name.
- Please include proper comments and documentation for everything you create.
- If you are using vibe coding platforms, please make sure your generated code has necessary error handlers and does not crash.
------
*Note: You will be working on the following tasks in decreasing level of priority. I have included all relevant documentation from the original project in this. Note that the function flow chart from [Assets](./Assets/) folder is outdated by around 2 weeks.

# Tasks 

## **1. Front End Reconstruction**

The current front end is done entirely in HTML and CSS for a demo version and have included most pages. I have given below a flowchart of the workings of the current front end. Please recreate the pages in ReactJS while keeping the flow intact. I have also color coded a few pages that we have not started on yet but are relevant and important to our platform. All of the api endpoints for these are already available on the backend along with swagger implementation for easy understanding. I have not included the **.env** file since they contain private keys as they are irrelevant to this section.

## **2. Front End Enhancement**

The current front end is designed with only the basic HTML experience. Please convert this into a material design as per your tastes. Note that the preferred primary color is #0A1F14 as per the background of the [Patent Gap Logo](./Assets/full_logo.png) in Assets. Please generate Gifs, SVG files or icons as and when required using free services online if you feel the need for additional assets to make it more **Zazzyyy**. 

## **3. Front End Updates**

The below features have been added to the front end and not been verified. Please verify their workings with dummy data.
- Report display
- Summary display

The below features have yet to be added to the front end. Please add them.
- **Notification Click** : The notifications list doesn't have a verified click action. Please add a click action such that it redirects to the case details of the connected case id.
- **Collapsible Cards** : Please implement collapsible card structure to the Case Details page
- **Search Box** : For Attorney and client home pages, include a search button that allows for searching patents based on case id, title, inventors or attorneys. Please refer the return line of **get_complete_patent_info** function from [USPTO](./Reference%20Backend%20Python/sources/USPTO.py) for reference on how cases are stored.

## **4. Backend Improvements**

There are a ton of stuff to complete in the backend so IF you are able to finish the front end properly on time, please start completing the backend. Most functions have descriptions on what each does. Here's a list of priority bugs in the backend to fix : 
- Currently we use a mongodb connection string obtained from Firebase to connect to Firebase Database, please shift that to using the Firebase connection file instead.
- Most of the models in [models](./Reference%20Backend%20Python/models/) still use a static variable instead of connecting to firebase database. I've already included generic functions to interact with firebase. Please use these functions to replace the current flow. Add appropriate data handlers.
- Currently commented, there is a set of code that is supposed to get the a list of embeddings (matrices) from each document and append it to firebase but embeddings are numpy arrays and firebase does not support storing it. Please debug and suggest fixes. DO NOT IMPLEMENT THEM.

# Flow Chart

![Front End Flow Chart.drawio](./Assets/Front%20End%20Flow%20Chart.png)

# Current Project Structure (for path reference)
```
patent-gap/
├── Backend/                 # Python backend files
│   ├── app.py              # Main Flask application
│   ├── controller.py       # Business logic controllers
│   ├── data_processor.py  # PDF processing and text embedding functions
│   ├── database.py         # Database and cloud storage connectivity (Firebase, GCP)
│   ├── swagger.py          # Swagger/OpenAPI configuration
│   ├── models/             # Data models organized by domain
│   │   ├── alerts.py       # Alert management models
│   │   ├── cases.py        # Case management models
│   │   ├── demo.py         # Demo request models
│   │   └── users.py        # User management models
│   └── env_example.txt     # Environment variables example
├── Frontend/               # HTML frontend files
│   ├── index.html          # Home page
│   ├── login.html          # Login page
│   ├── home.html           # Attorney dashboard page
│   ├── home-client.html    # Client dashboard page
│   ├── case-details.html   # Case details page
│   ├── add-patent.html     # Add new patent page
│   ├── request-demo.html   # Request demo page
│   ├── change_password.html # Change password page
│   └── styles.css          # Shared CSS styles
├── Assets/                 # Images, media, documents
├── Screenshots/            # Application screenshots
├── requirements.txt        # Python dependencies
└── README.md              # This file
```

# To Access Swagger

```bash
cd '.\Reference Backend Python\'
python app.py
```

# Access Credentials

As mentioned above, we currently use static user list on the code itself for demo purposes. Please use any of that list credentials for login. 

Once you convert that to firebase functions, please create your own credentials using the Register page you will be building.

# API Endpoints

## Authentication
- `POST /api/login` - User login with email and password
- `POST /api/logout` - User logout and session clearing

## Cases Management
- `GET /api/my-cases` - Get user's assigned cases (created_by, assigned_to, or accepted_by)
- `GET /api/open-cases` - Get available cases for assignment (non-completed cases)
- `GET /api/cases/<case_id>` - Get detailed information about a specific case
- `POST /api/cases/<case_id>` - Update case details
- `POST /api/cases/<case_id>/update-status` - Update case information (status, priority, etc.)

## Profile Management
- `GET /api/profile` - Get user profile and statistics
- `POST /api/verify-password` - Verify current password
- `POST /api/change-password` - Change user password

- `GET /api/cases/<case_id>/patents` - Get related patents for a specific case (keyword-based similarity)
- `POST /api/add-patent` - Add a new patent manually
- `POST /api/create-patent` - Create a new patent with user attribution
- `POST /api/import-patent-from-uspto` - Import patent data from USPTO by patent ID
- `POST /api/fetch-patent-from-uspto` - Fetch and create a case from USPTO patent data

## File Management
- `POST /api/upload-file-to-local-storage/<case_id>` - Upload file to local `documentFiles/` directory
- `POST /api/upload-file/<case_id>` - Upload file to Google Cloud Storage bucket

## Alert & Notification Management
- `GET /api/alerts` - Get all alerts in the system
- `GET /api/alerts/` - Get alerts for the current user with similarity analysis

#### Similarity Analysis
- `POST /api/trigger-similarity-analysis` - Trigger keyword-based similarity analysis for a case
- `GET /api/case-keywords` - Extract keywords from a document URL or title/description

## Demo Requests
- `POST /api/create-demo-request` - Create a new demo request

## Web Pages
- `GET /` - Home page (landing page, initializes database collections)
- `GET /login` - Login page
- `GET /home` - Client/Attorney dashboard page (requires authentication)
- `GET /case-details?id=<case_id>` - Case details page (requires authentication)
- `GET /add-patent` - Add new patent page (requires authentication)
- `GET /request-demo` - Request demo page
- `GET /change-password` - Change password page (requires authentication)
- `GET /favicon.ico` - Serve favicon from Assets directory
- `GET /images/<path:imageName>` - Serve images from Assets directory

# ⚙️ Architecture Overview

The backend follows a modular architecture with clear separation of concerns:

## Models (`Reference Backend Python/models`)
Domain-specific data models organized by entity:
- **`alerts.py`**: Alert creation, retrieval, user-specific alert filtering with similarity analysis
- **`cases.py`**: Case CRUD operations, user-case relationships, document handling, embedding retrieval
- **`demo.py`**: Demo request creation and management
- **`users.py`**: User authentication (mock data), profile management, password operations

## Database Module (`Reference Backend Python/database.py`)
Provides connectivity and operations for:
- **MongoDB Database**: Primary database for all collections (cases, alerts, users, demo_requests, patents)
- **Google Cloud Storage**: File upload/download operations for document storage
- Environment-aware connection management (dev/prod/test)
- Auto-creation of collections on first access

## Controller (`Reference Backend Python/controller.py`)
Business logic layer that orchestrates:
- Patent creation and processing with keyword-based similarity matching
- New patent processing workflow with embedding extraction and alert generation
- Case-related patent retrieval using keyword matching
- Coordinates between models, data processing, and external APIs

## Data Processor (`Reference Backend Python/data_processor.py`)
Text processing and embedding generation:
- Keyword extraction (online via OpenAI or offline via TF-IDF)
- OpenAI embeddings (online) or TF-IDF embeddings (offline fallback)
- Cosine similarity calculations for patent analysis
- USPTO API integration for patent search and data normalization
- Report generation coordination with LLM processor

## LLM Processor (`Backend/llm_processor.py`)
AI-powered content generation:
- Multi-model support (Google Gemini, OpenAI GPT)
- Patent comparison report generation
- Report summarization
- Automatic model selection based on available API keys

## File Controller (`Backend/file_controller.py`)
Document reading and conversion:
- XML to text conversion
- PDF text extraction from URLs
- Multi-format document handling with HTTP header support

## Sources (`Backend/sources/`)
External data source integrations:
- **`USPTO.py`**: Comprehensive USPTO Patent API wrapper for patent search, document retrieval, and data normalization

## Environment Controller (`Backend/env_controller.py`)
Configuration management:
- API key retrieval (USPTO, OpenAI, Gemini)
- Environment-aware database connection strings
- Collection name management for different environments
