export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#02030b] px-6">
      <div className="w-full max-w-xl rounded-[2rem] border border-cyan-300/12 bg-[rgba(5,10,24,0.72)] p-8 shadow-[0_0_120px_rgba(46,231,255,0.08)] backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.24em] text-cyan-100/55">
          Neural realm bootstrap
        </p>
        <h1 className="mt-4 font-display text-4xl tracking-[-0.06em] text-white">
          Streaming the digital layer...
        </h1>
        <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/8">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-[linear-gradient(90deg,#2ee7ff,#ff4fd8,#8b5cff)]" />
        </div>
      </div>
    </div>
  );
}
