# ShopWiseAI - Backend

A FastAPI backend for ShopWiseAI, a multi-platform AI product comparison tool.

## Tech Stack
- **FastAPI** - Python web framework
- **MongoDB Atlas** - Cloud database
- **ScraperAPI** - Web scraping (Amazon, Flipkart, Myntra, Nykaa)
- **Railway** - Deployment platform

## Features
- Multi-platform product search (Amazon, Flipkart, Myntra, Nykaa)
- User authentication
- Wishlist management
- Search history tracking

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Project info |
| GET | `/status` | Health check |
| GET | `/search?keyword=` | Search products |
| POST | `/register` | Register user |
| POST | `/login` | Login user |
| GET | `/wishlist` | Get wishlist |
| POST | `/wishlist/add` | Add to wishlist |
| DELETE | `/wishlist/delete` | Remove from wishlist |
| GET | `/history` | Get search history |
| POST | `/history/add` | Add search history |

## Environment Variables
```env
MONGO_URI=mongodb+srv://laxmivadthyavath99_shopwiseai:shopwise@cluster0.tgysbxm.mongodb.net/shopwiseai
SCRAPER_API_KEY=9eb17b1bc06c4a5bcf67efc76fb07d51
```

## Local Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

## Live API
https://shopwiseai-production.up.railway.app
