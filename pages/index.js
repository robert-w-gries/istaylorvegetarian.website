import Head from 'next/head'
import { useEffect, useState } from 'react';

const TIME_CONVERSION = {
  year: 60 * 60 * 24 * 365,
  month: 2629800,
  day: 60 * 60 * 24,
  hour: 60 * 60,
  minute: 60,
  second: 1,
};

const VEGETARIAN_SINCE = new Date("4/29/2016");

const getTimeArrayFromSeconds = (elapsed) => {
  let strings = [];
  for (const key of ['year', 'month', 'day', 'hour', 'minute', 'second']) {
    let value = Math.floor(elapsed / TIME_CONVERSION[key]);
    elapsed -= value * TIME_CONVERSION[key];
    strings.push(value === 1 ? { value, key } : { value, key: `${key}s` });
  }
  return strings;
};

const getElapsedSeconds = (start, end) => Math.floor((end - start) / 1000);

export default function Home() {
  const [vegetarianTimeElapsed, setVegetarianTimeElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => (
      setVegetarianTimeElapsed(getElapsedSeconds(VEGETARIAN_SINCE, Date.now())), 1000)
    );
    return () => clearInterval(timer);
  });

  return (
    <div className="h-screen flex flex-col dark:bg-gray-800">
      <Head>
        <title>Is Taylor Vegetarian?</title>
        <meta name="description" content="Is Taylor Vegetarian?" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-1 flex flex-col gap-10 justify-center items-center dark:text-white">
        <h1 className="text-5xl">Is Taylor Vegetarian?</h1>
        <p className="text-9xl">{vegetarianTimeElapsed > 0 ? "YES" : "NO"}</p>
        <div className="flex flex-col items-center">
          <p className="text-4xl mb-6">Taylor has been vegetarian for...</p>
          <div className="flex gap-10 text-4xl">
            {getTimeArrayFromSeconds(vegetarianTimeElapsed).map(({ key, value }, i) => (
              <div key={key} className="flex flex-col justify-center items-center w-32 h-24 border rounded dark:border-gray-200">
                <div>{value}</div>
                <div className="text-xl">{key}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
