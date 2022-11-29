import type { Response } from "express";

export async function processResult<T>(fn: () => Promise<T>, res: Response, error?: string) {
    return  fn().then(data => {
        res.send(JSON.stringify(data));
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || error,
        })
      })
  };
