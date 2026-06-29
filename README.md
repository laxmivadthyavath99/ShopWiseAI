# ShopWiseAI 🛍️

A multi-platform AI-powered product comparison tool that searches across Amazon, Flipkart, Myntra, and Nykaa — helping users find the best deals in real time.

## 🔗 Live Demo

- **Frontend**: https://shop-wise-ai-six.vercel.app
- **Backend API**: https://shopwiseai-production.up.railway.app

---

## 📸 Features

- 🔍 **Multi-Platform Search** — Search products across Amazon, Flipkart, Myntra, and Nykaa simultaneously
- 🤖 **AI Recommendation** — Automatically recommends the best deal with a score out of 100
- 📊 **Price Comparison** — Compare prices across platforms with lowest, highest, and average price stats
- 🏆 **Best Deal Badge** — Highlights the cheapest product in search results
- 🔃 **Sort & Filter** — Filter by platform and sort by price (low to high / high to low)
- ❤️ **Wishlist** — Save favourite products to a personal wishlist
- 🕒 **Search History** — Tracks and displays recent searches per user
- 👁️ **Recently Viewed** — Shows last 5 viewed products
- 🔐 **Authentication** — Register and login with secure password hashing

---

## 🛠️ Tech Stack

### Frontend
- React 19 + Vite
- Tailwind CSS v4
- React Icons
- Deployed on **Vercel**

### Backend
- FastAPI (Python)
- ScraperAPI (web scraping)
- BeautifulSoup4 + Requests
- Passlib (bcrypt password hashing)
- Deployed on **Railway**

### Database
- MongoDB Atlas (cloud)
- Collections: `users`, `wishlist`, `history`

---

## 📁 Project Structure

```
ShopWiseAI/
├── frontend/                  # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── SearchSection.jsx
│   │   │   ├── AIRecommendation.jsx
│   │   │   ├── LoginModal.jsx
│   │   │   ├── RegisterModal.jsx
│   │   │   ├── Categories.jsx
│   │   │   ├── Platforms.jsx
│   │   │   └── TrendingProducts.jsx
│   │   ├── api.js             # API base URL config
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── .env
├── backend/                   # FastAPI backend
│   ├── main.py
│   ├── db.py
│   ├── auth.py
│   ├── amazon_scraper.py
│   ├── scraper.py             # Flipkart
│   ├── myntra_scraper.py
│   ├── nykaa_scraper.py
│   ├── requirements.txt
│   └── .env
└── README.md
```

---

## 🚀 Local Setup

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Create `backend/.env`:
```env
MONGO_URI=your_mongodb_atlas_uri
SCRAPER_API_KEY=your_scraperapi_key
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Create `frontend/.env`:
```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Project info |
| GET | `/status` | Health check |
| GET | `/search?keyword=` | Search products across all platforms |
| POST | `/register` | Register a new user |
| POST | `/login` | Login user |
| GET | `/wishlist?username=` | Get user wishlist |
| POST | `/wishlist/add` | Add product to wishlist |
| DELETE | `/wishlist/delete` | Remove product from wishlist |
| GET | `/history?username=` | Get search history |
| POST | `/history/add` | Save search keyword |

---

## 🌐 Deployment

| Service | Platform | Notes |
|---------|----------|-------|
| Frontend | Vercel | Auto-deploys on git push |
| Backend | Railway | Auto-deploys on git push |
| Database | MongoDB Atlas | Free M0 cluster |
| Scraping | ScraperAPI | 1000 free calls/month |

---

## 👩‍💻 Author

**Laxmi Vadthyavath**
- GitHub: [@laxmivadthyavath99](https://github.com/laxmivadthyavath99)
- Project: [ShopWiseAI](https://github.com/laxmivadthyavath99/ShopWiseAI)