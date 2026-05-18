# AGENTIC.md

## 1. Tools used

For the development of this Project I used AI tools as Claude Code and GitHub Copilot. The first one I used it to organize my ideas and connect each part of the Project, also for debugging process. I only used the Copilot auto-complete function when it was appropiate, always reviewing that the code it offered was correct and understandable.

## 2. My approach

I started with the main idea of doing an appoinment booking application and I gave the AI the ideas and the plan I had. The AI also started to give ideas to keep it simple but complete. The AI guided me step by step on the process, for example one of the AI's main tasks was the creation of routes for each service, so the application could work perfctly well. The frontend of the web page was almost completely done with AI because I did not had a frontend focus on my Project. The AI also helped me on debugging when some errors appeared.

## 3. Key prompts

Some key prompts were (translated from the Spanish):

 
"I want to do an appointment booking app for this project. I have experience working and programming with python and SQL databases, I want to focus on backend. Help me organize step by step the files I would need."

The AI started to create the architecture of the project giving me this example:
medcitas/
├── backend/
│   ├── app/
│   │   ├── api/           # Routers (controllers) — solo reciben y responden
│   │   │   ├── auth.py
│   │   │   ├── doctors.py
│   │   │   ├── appointments.py
│   │   │   └── specialties.py
│   │   ├── services/      # Lógica de negocio — aquí viven las reglas
│   │   │   ├── auth_service.py
│   │   │   ├── appointment_service.py
│   │   │   └── doctor_service.py
│   │   ├── repositories/  # Queries a la BD — separadas del negocio
│   │   │   ├── appointment_repo.py
│   │   │   └── doctor_repo.py
│   │   ├── models/        # SQLAlchemy models (tablas)
│   │   ├── schemas/       # Pydantic schemas (validación y serialización)
│   │   ├── core/          # Config, seguridad, JWT
│   │   └── main.py
│   ├── tests/
│   ├── .env
│   └── requirements.txt
├── frontend/
├── AGENTIC.md
└── README.md

I did modify many files and folder's order on the process to make it more simple. As you can see on the final folder it is not the same structure.


"Before starting creating the first documents, help me remember how to link this project with a Git repository"

I basically asked for the specific codelines of git: "git init" "git status" "git commit -m" and others.

Other type of prompts were the ones I explained the code the AI gave me in order to check if I did understand completely what it does or how it is called on other files.

"What does meaningful tests means? Give me some ideas for the tests i could present"

The AI started to explain me how tests worked, because I have not do this process on my previous projects, as I always tested directly with the UI. Tha AI just gave me the register and login tests but I add the others as register with an existing email, register without name or other fields and login with a wrong password.

## 4. Critical Evaluation

One significant piece of AI-generated code was the initial `app.js` file. The AI generated it with the middlewares (`express.json()` and `cors()`) placed after the route definitions. This caused a 500 Internal Server Error when trying to create an appointment because Express processes code top to bottom, but the routes were being executed before the JSON body was configured, causing an error.

The AI got the structure right but missed the order dependency. I identified the bug by reading the error message carefully and understanding that Express middleware order matters. I fixed it by moving `app.use(cors())` and `app.use(express.json())` before all route definitions.

This taught me that AI-generated code needs to be read and understood, not just copy-pasted — even when it looks correct at first glance.

## 5. What I learned

Working on this project helped me understand many important aspects of the backend programming. For example, on my previous projects I always worked with an existing UI, so each change I made on the backend I always tested it directly manual on the frontend, I learned there are extensions that help me test backend without having an existting UI, like Thunder Client. Also I learned about the importance of the order I program the middlewares on the app.js (the brain of the project) and last but not least I keep understanding how to use the AI as a tool to help me understand my projects step by step and also how to communicate my ideas.