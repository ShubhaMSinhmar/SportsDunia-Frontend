export default function ArticleCard({ article }) {
    return (
      <div className="group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200">
        {article.urlToImage ? (
          <img
            src={article.urlToImage}
            alt={article.title}
            className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="h-48 w-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
            No Image
          </div>
        )}
  
        <div className="flex flex-col flex-1 p-5">
          <h3 className="text-lg font-bold text-gray-800 mb-2 leading-snug group-hover:text-blue-600 line-clamp-2">
            {article.title}
          </h3>
          <div className="text-sm text-gray-500 mb-2">
            {article.author || "Unknown Author"} • {new Date(article.publishedAt).toDateString()}
          </div>
          <a
            href={article.url}
            target="_blank"
            className="text-blue-600 font-medium hover:underline mt-auto"
            rel="noreferrer"
          >
            Read More →
          </a>
        </div>
      </div>
    );
  }
  