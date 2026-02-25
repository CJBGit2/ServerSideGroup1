import type { Request, Response } from "express";
import type { QueryError, RowDataPacket } from "mysql2";
import db from "../config/db";
import type { EvaluationInput, Operation } from "../types/types";

const ops: readonly Operation[] = ["+", "-", "*", "/"] as const;

export const createEvaluations = (
  req: Request<{}, {}, EvaluationInput>,
  res: Response
) => {
  const { value1, value2, operation } = req.body;

  if (!ops.includes(operation)) {
    return res.status(400).json({ message: "Invalid operation" });
  }

  if (operation === "/" && value2 === 0) {
    return res.status(400).json({ message: "Cannot divide by zero" });
  }

  const answer =
    operation === "+"
      ? value1 + value2
      : operation === "-"
      ? value1 - value2
      : operation === "*"
      ? value1 * value2
      : value1 / value2;

  db.query(
    "INSERT INTO evaluations (value1, value2, operation, answer) VALUES (?, ?, ?, ?)",
    [value1, value2, operation, answer],
    (err: QueryError | null) => {
      if (err) return res.status(500).json({ message: "DB error" });
      return res.status(201).json({ value1, value2, operation, answer });
    }
  );
};

export const getEvaluations = (_req: Request, res: Response) => {
  db.query(
    "SELECT * FROM evaluations",
    (err: QueryError | null, results: RowDataPacket[]) => {
      if (err) return res.status(500).json({ message: "DB error" });
      return res.json(results);
    }
  );
};