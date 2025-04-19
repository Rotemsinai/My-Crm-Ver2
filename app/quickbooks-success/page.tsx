export default function QuickBooksSuccess() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-green-700 mb-4">QuickBooks Connected Successfully!</h1>
        <p className="text-lg mb-6">Your QuickBooks account has been successfully connected to your CRM application.</p>
        <a
          href="/dashboard"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors"
        >
          Return to Dashboard
        </a>
      </div>
    </div>
  )
}
