import { Card } from "@/shadcn/ui/card"

const Page = () => {
  return (
    <div className="md:mt-28 mt-6 h-full">
      <div className="flex gap-4 flex-col-reverse md:flex-row">
        <Card className="overflow-hidden flex-grow saturate-50">
        <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Aaffd4e2f975946e5db4ddd396893a405f5f404d9d9bbcf942f40245f60dd6821&amp;source=constructor" width="100%" height="500"></iframe>
        </Card>
        <Card className="border-none md:p-4 bg-transparent shadow-none flex-grow">
          <div className="flex flex-col gap-4 justify-center md:items-center md:text-center h-full">
          <h1 className="text-3xl font-bold">Контакты</h1>
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold">Адрес</h2>
              <p className="text-base">г. Бишкек, ул. Манас, 8</p>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold">Телефон</h2>
              <p className="text-base">+996 707 284 954</p>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold">E-mail</h2>
              <p className="text-base">
                <a href="mailto:isla.asankojoev@mail.ru" className="text-base">
                  isla.asankojoev@mail.ru
                </a>
              </p>
            </div>
        </div>
      </Card>
    </div>
    </div>
  )
}

export default Page