export const htmlResponse = (responseBody: string) => {
  return {
    statusCode: 200,
    body: responseBody,
    headers: {
      'Content-Type': 'text/html'
    }
  }
}
