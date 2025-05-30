# 🛍️ ProductHub - Modern Vue 3 Product Management Dashboard

A beautiful, modern Vue.js 3 application for managing products with full CRUD operations, advanced search, filtering, and responsive design.

## ✨ Features

### 🎨 **Modern Design**
- Beautiful gradient backgrounds and smooth animations
- Responsive design that works on all devices
- Hover effects and micro-interactions
- Clean, intuitive user interface with Tailwind CSS

### 🔧 **Core Functionality**
- **CRUD Operations**: Create, Read, Update, Delete products
- **Real-time Search**: Search by title, description, or category
- **Advanced Filtering**: Filter by category with clear indicators
- **Sorting Options**: Sort by price, rating, title, or default order
- **Image Preview**: Live preview of product images in forms

### 🚀 **Technical Features**
- **Vue 3 Composition API**: Modern reactive programming
- **Pinia State Management**: Centralized state management
- **Axios HTTP Client**: RESTful API integration
- **Tailwind CSS**: Utility-first styling with custom components
- **Component Architecture**: Modular, reusable components
- **Error Handling**: Graceful error management and user feedback
- **Loading States**: Elegant loading indicators
- **Toast Notifications**: Non-intrusive user feedback

## 🛠️ Tech Stack

- **Frontend**: Vue 3 (Composition API)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Pinia
- **HTTP Client**: Axios
- **Icons**: Lucide Vue
- **API**: Fake Store API (Mock backend)

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone or extract the project**
   ```bash
   git clone https://github.com/your-username/vue-product-dashboard.git
   cd vue-product-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/          # Reusable Vue components
│   ├── Header.vue       # Application header
│   ├── SearchFilter.vue    # Search and filter component
│   ├── ProductGridLayout.vue     # Individual product grid layout
│   ├── ProductListLayout.vue     # Individual product list layout
│   ├── ProductModal.vue    # Add/Edit product modal
│   ├── Products.vue    # Products grid layout
│   ├── LoadingState.vue    # Loading component
│   ├── ErrorState.vue      # Error state component
│   ├── EmptyState.vue      # Empty state component
│   ├── ConfirmModal.vue    # Confirmation dialog
│   └── ToastNotification.vue # Toast notifications
├── stores/             # Pinia stores
│   └── products.js        # Product state management
├── views/              # Page components
│   └── Dashboard.vue      # Main dashboard view
├── utils/              # Utility functions
│   └── helpers.js         # Helper functions
├── composables/        # Vue composables
│   └── useToast.js        # Toast notification composable
├── router/             # Vue Router configuration
│   └── index.js
├── App.vue             # Root component
├── main.js             # Application entry point
└── style.css           # Global styles and Tailwind
```

## 🎯 API Integration

The application integrates with the [Fake Store API](https://fakestoreapi.com/) for:

- `GET /products` - Fetch all products
- `POST /products` - Create new product (mocked)
- `PUT /products/:id` - Update product (mocked)
- `DELETE /products/:id` - Delete product (mocked)
- `GET /products/categories` - Fetch categories

## 🎨 Design Features

### **Visual Elements**
- Gradient backgrounds and modern color schemes
- Card-based layout with hover animations
- Smooth transitions and micro-interactions
- Professional typography using Inter font

### **User Experience**
- Intuitive navigation and clear visual hierarchy
- Real-time search with instant results
- Filter indicators and easy filter clearing
- Responsive design for mobile, tablet, and desktop

### **Interactive Components**
- Modal dialogs for adding/editing products
- Confirmation dialogs for destructive actions
- Toast notifications for user feedback
- Loading states and error handling

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Friendly**: Perfect layout for tablets
- **Desktop Enhanced**: Rich experience on larger screens
- **Touch Optimized**: Touch-friendly interactions

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint and fix code

## 🎥 Demo Features

### **Product Management**
1. **View Products**: Browse all products in a responsive grid
2. **Search**: Real-time search across title, description, and category
3. **Filter**: Filter products by category
4. **Sort**: Sort by price, rating, title, or default order

### **CRUD Operations**
1. **Add Product**: Create new products with form validation
2. **Edit Product**: Update existing product information
3. **Delete Product**: Remove products with confirmation
4. **Image Preview**: Live preview of product images

### **User Experience**
1. **Responsive Design**: Works seamlessly on all devices
2. **Loading States**: Elegant loading indicators
3. **Error Handling**: Graceful error management
4. **Toast Notifications**: Instant feedback for all actions

## 🎯 Key Highlights

- **Modern Vue 3**: Uses latest Composition API features
- **Component Architecture**: Well-organized, reusable components
- **State Management**: Centralized state with Pinia
- **Type Safety**: Proper prop validation and error handling
- **Performance**: Optimized rendering and state management
- **Accessibility**: Semantic HTML and keyboard navigation
- **Code Quality**: Clean, maintainable, and well-documented code

## 📧 Submission Details

This project fulfills all requirements of the Vue.js Practical Test:

✅ **Fetch and Display Products**: Complete with responsive grid layout  
✅ **Add New Product**: Modal form with validation and API integration  
✅ **Edit Product**: In-place editing with pre-populated forms  
✅ **Delete Product**: Confirmation dialog and API integration  
✅ **Search and Filter**: Real-time search and category filtering  
✅ **Modern Design**: Beautiful, responsive UI with animations  
✅ **Vue 3 Composition API**: Modern reactive programming patterns  

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ using Vue 3, Tailwind CSS, and modern web technologies**
