import SlideBottom from "../Animated/SlideBottom"
import SlideLeft from "../Animated/SlideLeft"

const stats = [
    { id: 1, name: 'Platform users', value: '2,500+' },
    { id: 2, name: 'Marketing agencies', value: '30+' },
    { id: 3, name: 'Uptime guarantee', value: '99.9%' },
    { id: 4, name: 'Words generated', value: '20,000,000+' },
  ]
  
  export default function Example() {
    return (
      <div className="relative isolate overflow-hidden py-24 sm:py-32 mt-16">
        <div className="absolute w-full h-full top-0 bg-black opacity-70"></div>
        <img
          src="https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className="absolute -bottom-8 -left-96 -z-10 transform-gpu blur-3xl sm:-bottom-64 sm:-left-40 lg:-bottom-32 lg:left-8 xl:-left-10"
            aria-hidden="true"
          >
          </div>
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
            <SlideLeft>
            <p className="mt-2 text-3xl font-medium tracking-tight text-white sm:text-5xl">
              Trusted by thousands of creators worldwide.
            </p>
            </SlideLeft>
            <SlideLeft>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste
              dolor cupiditate blanditiis ratione.
            </p>
            </SlideLeft>
          </div>
          <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 text-white sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col gap-y-3 border-l border-white/10 pl-6">
                <SlideBottom>
                <dt className="text-base leading-6 mb-1">{stat.name}</dt>
                <dd className="order-first text-4xl font-semibold tracking-tight">{stat.value}</dd>
                </SlideBottom>
              </div>
            ))}
          </dl>
        </div>
      </div>
    )
  }
  