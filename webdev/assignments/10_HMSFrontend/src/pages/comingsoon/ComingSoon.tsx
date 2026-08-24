import { useLocation, useNavigate } from "react-router-dom";

function ComingSoon() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex min-h-full items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-lg text-center">
        {/* Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-2xl">
            ⚙️
          </div>
        </div>

        {/* Title */}
        <h1 className="mt-6 text-2xl font-semibold text-gray-900">
          Page Under Development
        </h1>

        {/* Status */}
        <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-yellow-50 px-3 py-1 text-xs font-medium text-yellow-700">
          <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
          In Progress
        </div>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-gray-500">
          This section of the Hotel PMS is currently being developed. Please
          check back later.
        </p>

        {/* Current route */}
        <div className="mx-auto mt-5 max-w-sm rounded-md border border-gray-200 bg-white px-4 py-3">
          <p className="text-xs text-gray-400">Current page</p>

          <p className="mt-1 break-all font-mono text-sm text-gray-700">
            {location.pathname}
          </p>
        </div>

        {/* Progress */}
        <div className="mx-auto mt-6 max-w-sm">
          <div className="mb-2 flex justify-between text-xs text-gray-400">
            <span>Development</span>
            <span>Coming Soon</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-gray-200">
            <div className="h-full w-1/3 rounded-full bg-blue-600" />
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="mt-8 rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default ComingSoon;
