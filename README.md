## Код сервиса

src/ - Исходный код
tests/ - Тесты

- **components/** - Компоненты приложения, которые используются многократно.
- **config/** - Конфигурационные файлы для настройки проекта.
- **images/** - Статические изображения для интерфейса.
- **pages/** - Страницы приложения, каждая представляет отдельный экран или раздел.
- **shared/** - Общие элементы проекта:
  - **api/** - Сервисы для взаимодействия с API.
  - **hooks/** - Кастомные хуки для повторного использования логики.
- **utils/** - Вспомогательные утилиты и типы.
- **App.tsx** - Главный файл приложения, отвечает за начальную настройку.
- **Main.tsx** - Точка входа приложения.

### ServerService
- Базовый сервис для выполнения HTTP-запросов.
- Используется для взаимодействия с API.
- Предоставляет метод `request`, который инкапсулирует логику отправки запроса, обработки ошибок и работы с заголовками.

### OrdersService
- Наследуется от `ServerService`.
- Методы:
  - **getOrders**: получение списка заказов с пагинацией и фильтрацией по статусу.
  - **getAllOrders**: получение всех заказов без пагинации.
  - **getOrdersByTotal**: сортировка заказов по общей стоимости (по возрастанию или убыванию).
  - **closeOrder**: закрытие заказа по ID (изменение статуса на завершённый).

### AdvertisementsService
- Наследуется от `ServerService`.
- Методы:
  - **getAdvertisements**: получение списка объявлений с пагинацией.
  - **getTotalAdvertisements**: получение всех объявлений.
  - **getAdvertisementsBySearch**: поиск объявлений по названию с пагинацией.
  - **getAdvertisementsByFilter**: фильтрация объявлений по заданным параметрам.
  - **addAdvertisement**: добавление нового объявления.

### AdvertisementService
- Наследуется от `ServerService`.
- Методы:
  - **getAdvertisement**: получение объявления по ID.
  - **updateAdvertisement**: обновление данных объявления по ID.

### useAdvertisement 
- Кастомный хук для работы страницы с обьявлением

### useAdvertisements
- Кастомный хук для работы страницы с обьявлениями

### useOrders
- Кастомный хук для работы страницы с заказами

## Скрипты

В проекте настроены несколько npm-скриптов для различных задач:

### `npm run dev`
Запускает проект в режиме разработки

### `npm run build`
Запускает TypeScript компилятор для сборки проекта и затем выполняет сборку с помощью Vite.  
Этот скрипт создаёт оптимизированную для продакшена версию проекта.

### `npm run lint`
Запускает Eslint для проверки и автоматического исправления (если возможно) кода во всём проекте.

### `npm run preview`
Запускает сервер для предпросмотра собранного проекта (после выполнения команды `build`).  

### `npm run server`
Запускает [json-server](https://github.com/typicode/json-server) для эмуляции REST API, используя файл `db.json` как источник данных.  
Сервер будет доступен по адресу: `http://localhost:3001`.

### `npm run test`
Запуск тестов