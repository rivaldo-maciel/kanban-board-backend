class GenericError extends Error {
  public status: number;
  public message: string;
}

export default GenericError;