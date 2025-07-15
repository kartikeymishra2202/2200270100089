URL Shortener Microservice – Backend Assignment

Features
1.URL shortening with optional custom shortcode

2. Redirection to original URL with expiration support

3. In-built hit counter for each short URL

   API Endpoints
POST /shorturls
Create a new shortened URL.


Request Body:
{
  "url": "https://example.com",
  "validity": 15,
  "shortcode": "kart001"
}

Response:
{
  "shortLink": "http://localhost:3000/kart001",
  "expiry": "2025-07-15T12:45:00Z"
}
GET /:shortcode
Redirects to the original long URL (if not expired).

GET /shorturls/:shortcode
Returns usage stats:


{
  "url": "https://example.com",
  "expiry": "2025-07-15T12:45:00Z",
  "hits": 3
}

<img width="1356" height="778" alt="image" src="https://github.com/user-attachments/assets/effec822-80fe-4cb9-a516-c161de54a57b" />
<img width="1435" height="848" alt="image" src="https://github.com/user-attachments/assets/c25fd8db-da5a-454c-949b-ef0fb8afc755" />
<img width="1410" height="837" alt="image" src="https://github.com/user-attachments/assets/9b8a8bda-994c-4aeb-a4cd-1f9538ca07f8" />

