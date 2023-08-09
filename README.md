## Taskify

(still not 100% complete, but MVP is live at https://taskify.pro)
Taskify is a software project management app that analyses your tasks/projects using deep learning. It allows you to create/manage organizations with many people, create projects within your organization and track tasks within a project. The twist is that all your tasks and projects are analyzed by deep learning to identify a number of signals. Currently, task complexity and ETA analysis is implemented, and I plan to implement github repository linking and analysis to perhaps automatically identify code pointers for a given task and so on. I talk more about how the ML works below.

## Tech stack
React, Next.js, Chakra UI for the frontend. Rust, Actix-Web, PostgreSQL, Redis for the backend. Python + PyTorch for deep learning. All deployed to AWS with CI/CD (Docker on EC2, ElastiCache, RDS, API Gateway).

## Deep learning techniques
Currently, NLP is used to analyze task names + description + other info provided to generate a complexity estimate (a complexity category, along with an ETA). I tried a number of approaches for this, from simply grouping together task name/descriptions with similar "meanings" and predicting ETA based on points in the dataset with similar meaning, but this performed awfully, primarily because default embeddings did not capture the full meaning of software engineering terminology. As you might expect, software engineers kind of speak their own language detached from regular english - terms like "bug" are used to mean issue. Regular embeddings would not place the words "bug" and "issue" in the same vector space, ie regular embeddings based on regular english would not recognize that these two wards have the same meaning in a software context. As such, software engineering specific embeddings were required.

After gathering embeddings by doing more crawling and research, the model started to perform well against the training/validation data (before, it wasn't even improving in accuracy during training). After some more fine tuning of parameters, I've found that it is now able to predict complexity/ETA with a good amount of accuracy!

