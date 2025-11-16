// import { baseUrl } from "@/lib/api";
// import { Heart } from "lucide-react";
// import React from "react";
// import { Link } from "react-router-dom";

// const ProductCard = ({ product }) => {
//   return (
//     <Link
//       to={`/view/${encodeURIComponent(product.name)}`}
//       state={{ product }} // still works for internal navigation
//       key={product._id}
//       className="group flex flex-col items-center text-center bg-white ring-1 ring-gray-200 rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out  w-full"
//     >
//       {/* Image Container */}
//       <div className="bg-gray-50 rounded-xl p-6 mb-4 w-full h-48 flex items-center justify-center overflow-hidden relative">
//         <img
//           src={`${baseUrl}/${product.images[0]}`}
//           alt={product.name}
//           className="max-h-full max-w-full object-cover transition-transform duration-300 group-hover:scale-105"
//         />
//         {/* Overlay for hover effect */}
//         <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
//       </div>

//       {/* Product Info */}
//       <div className="space-y-3 w-full">
//         {/* Name + Wishlist */}
//         <div className="flex items-center justify-between">
//           <h3 className="text-sm font-semibold text-gray-900 truncate">
//             {product.name}
//           </h3>
//           <button
//             className="text-gray-400 hover:text-red-500 transition-colors duration-200"
//             aria-label="Add to wishlist"
//           >
//             <Heart className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Price & Discount */}
//         <div className="flex items-center justify-center md:justify-start gap-3 text-sm">
//           <span className="text-xl font-bold text-gray-900">
//             {/* ${product.price} */}
//           </span>
//           {product.price + product.discount > product.price && (
//             <span className="text-gray-500 line-through">
//               {/* ${product.price + product.discount} */}
//             </span>
//           )}
//           {product.discount > 0 && (
//             <span className="text-red-600 font-medium">
//               {product.discount}% off
//             </span>
//           )}
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default ProductCard;

import { baseUrl } from "@/lib/api";
import { Heart } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  // Safely get first image
  const firstImage = product.images?.[0] || product.image;

  return (
    <Link
      to={`/view/${encodeURIComponent(product.name)}`}
      state={{ product }}
      key={product._id}
      className="group block w-full overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200 transition-all duration-300 hover:shadow-xl hover:ring-gray-300"
    >
      {/* Full-Bleed Image (No Padding) */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
        {firstImage ? (
          <img
            src={`${baseUrl}/${firstImage}`}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-50">
            <span className="text-sm text-gray-400">No image</span>
          </div>
        )}

        {/* Subtle Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-2">
        {/* Name + Wishlist */}
        <div className="flex items-center justify-between">
          <h3 className="truncate text-sm font-semibold text-gray-900">
            {product.name}
          </h3>
          <button
            className="text-gray-400 transition-colors hover:text-red-500"
            aria-label="Add to wishlist"
            onClick={(e) => e.preventDefault()} // Prevent navigation on click
          >
            <Heart className="h-5 w-5" />
          </button>
        </div>

        {/* Price & Discount */}
        <div className="flex items-center gap-2 text-sm">
          <span className="font-normal text-gray-900">
            {/* view button */}
            <button className="px-5 py-2 w-full rounded-full bg-black text-white hover:bg-black/25 transition">
              View
            </button>
          </span>

          {/* {product.discount > 0 && (
            <>
              <span className="text-gray-500 line-through">
                Kes.{" "}
                {(Number(product.price) + Number(product.discount)).toFixed(2)}
              </span>
              <span className="font-medium text-red-600">
                {product.discount}% off
              </span>
            </>
          )} */}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
