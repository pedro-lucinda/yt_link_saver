# FastAPI Application

## Installation

```bash
git clone <repository-url>
cd <repository-name>
pip install -r requirements.txt
```

## Running the application

```bash
uvicorn app.main:app --reload
```

### Run the application

```bash
  uvicorn app.main:app --reload
```

### Making Database Migrations

To create new database migrations after model changes:

```bash
alembic revision --autogenerate -m "name"
```

- To apply migrations to the database:

```bash
  alembic upgrade head
```

## Development Tools

We have included scripts to help with linting, formatting, and database migrations.

### Formatting

To format the codebase, run:

```bash
sh scripts/format.sh
```

### Linting

To lint the codebase, run:

```bash
sh scripts/lint.sh
```
