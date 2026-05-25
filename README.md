LedgerFlow 🏦

A production-grade banking transaction API built with Node.js, Express.js, and MongoDB.
Designed with real-world financial system principles like double-entry ledger bookkeeping, idempotent transfers, JWT authentication, and auditability.

📖 Overview :

 * Exploring how modern financial systems maintain:
   
 * Data consistency
   
 * Atomic transaction
   
 * Permanent audit trails
   
 * Secure authentication
   
 * Reliable money movement

This project is built to simulate production-level banking architecture and backend engineering practices.

✨ Core Concepts
Atomic Transactions

A transfer must either:

Debit one account and credit another successfully
Or fail completely without partial updates
Double-Entry Ledger

Every transaction creates:

One debit entry
One credit entry

This ensures:

Traceability
Financial accuracy
Immutable accounting history
Idempotency

Retrying the same transfer request should never create duplicate transactions.

🚀 Features Implemented :

JWT Authentication

Password hashing with Bcrypt

Secure cookie-based authentication

User registration & login

Welcome emails using Nodemailer

MongoDB integration with Mongoose

Centralized error handling

Async controller wrapper

Clean scalable backend architecture



🚧 In Progress

Deposit / Withdraw / Transfer APIs

Double-entry ledger engine

Idempotency key validation

Refresh token rotation

Transaction history filters

Rate limiting for sensitive routes

Role-based authorization

Spending analytics

Jest unit testing

Railway deployment



🛠️ Tech Stack:

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT + Bcrypt
* Email Service - Nodemailer


# Installation :

Clone the repository
git clone https://github.com/chaitanyamule-tech/ledgerflow.git

 Move into the project directory
cd ledgerflow

Install dependencies
npm install

 Create environment variables
cp .env.example .env

Start development server
npm run dev

Server will run on:
http://localhost:3000

#Authentication Routes :

1. Register User:
Endpoint :  POST /auth/register

2. Login User :
Endpoint : POST /auth/login

#Transaction APIs (Coming Soon):

Method	Endpoint	Description :

* POST	/transactions/deposit   	 Deposit funds

* POST	/transactions/withdraw	   Withdraw funds

* POST	/transactions/transfer	   Transfer funds

* GET	/transactions/history	       Transaction history

#Engineering Goals:

* LedgerFlow is focused on teaching and implementing:

* Scalable backend architecture

* Financial transaction workflows

* Secure authentication systems

* Error handling strategies

* Backend engineering best practices

* Production-ready API design


#Future Enhancements
  
* Refresh token rotation

* Redis-based token blacklist

* Rate limiting

* Audit logging

* Admin dashboard

* Docker support

* CI/CD pipelines

* Unit & integration tests

* API documentation with Swagger

* Microservice-ready architecture
