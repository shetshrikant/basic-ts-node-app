export default (_req: any, res: any, next: any) => {
  // const token = req.get('x-session-cookie')
  // check the token in db/redis against this token and set authenticated as true/false.
  const authenticated = true;
  try {
    if (authenticated) {
      next()
    } else {
      res.status(401).send('Unauthorized access.')
    }
  } catch (err) {
    res.status(401).send('')
  }
}