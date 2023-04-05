---
title: "What does this mean in JPA yml config file  hibernate.ddl-auto  update"
description: "This is a configuration property for Hibernate, a Java framework for persisting data in relational databases. The ddl-auto property is used to specify"
date: 2023-02-02T05:35:20.888Z
tags: []
---
### What is ddl-auto?
This is a **configuration property** for Hibernate, a Java framework for persisting data in relational databases. The ddl-auto property is used to specify how Hibernate should automatically handle database schema updates when the application is started.

The value update means that Hibernate will **automatically update the database schema to match the entities defined in the application**, but only make changes that are non-destructive. That is, it will not drop tables or columns that already exist in the database.

### What is the default?
The default value for the ddl-auto property is create. This means that when the application starts, Hibernate will automatically create the database schema based on the entities defined in the application, and will drop and recreate the schema if it already exists.

It is important to note that this **default value is not recommended for production use, as it will cause data loss if the database schema already exists.** Instead, it is typically recommended to set ddl-auto to validate, which will **validate the schema against the entities and raise an exception if they are not in sync**, or to update, which will **update the schema without making destructive changes.**

### What are some other options
The ddl-auto property supports the following values:

**create**: Hibernate will automatically create the database schema based on the entities defined in the application and will drop and recreate the schema if it already exists.

**create-drop**: Hibernate will automatically create the database schema based on the entities defined in the application, and will drop the schema when the application is closed.

**update**: Hibernate will automatically update the database schema to match the entities defined in the application, but only make changes that are non-destructive.

**validate**: Hibernate will validate the schema against the entities defined in the application, and raise an exception if they are not in sync.

**none**: Hibernate will not automatically manage the database schema. The schema must be created and updated manually.

It is **recommended to use the validate or update options in production environments**, to ensure that the schema is in sync with the entities and to prevent data loss. The other options are typically used in development or testing environments.

### Reference
https://chat.openai.com/chat