"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowDown, ArrowUpRight, Check, ChevronDown, Menu, Plus, X } from "lucide-react";
import WardrobeLab from "./wardrobe/lab";
import { LabelMark } from "./wardrobe/garment";
import { track } from "./telemetry";

const Arrow = () => <ArrowUpRight size={19} strokeWidth={1.5} aria-hidden="true" />;
const faqs = [
  ["Приложение уже работает?", "Мы разрабатываем первую версию для Android. В прототипе проверена загрузка и сохранение фотографий. Распознавание вещей и персональный подбор ещё разрабатываются. На этой странице можно попробовать отдельный интерактивный пример маршрута дня."],
  ["Чем маршрут дня отличается от одного образа?", "Вместо единственного комплекта мы исследуем последовательность: встреча, прогулка, вечер. Важны изменения между ними: что оставить, что снять и что взять с собой. В демоверсии можно закрепить одну вещь, менять погоду и посмотреть объяснения."],
  ["Что будет после заявки?", "Мы сохраним ваш контакт. Когда начнётся набор пилотной группы, команда напишет в Telegram, уточнит устройство и условия участия. Отправка анкеты не гарантирует немедленный доступ. Точная дата пока не объявлена."],
  ["Если у меня iPhone?", "Первую версию разрабатываем для Android. В форме можно указать iPhone: это поможет понять спрос. Сроки и формат версии для iOS пока не определены."],
  ["Нужно фотографировать весь шкаф сразу?", "Для первого знакомства мы хотим начать с небольшой капсулы — любимых вещей, которые вы уже носите. В пилоте проверим, какой объём удобен. Сейчас загружать личные фотографии на лендинг не нужно."],
  ["Сколько это стоит?", "Оставить заявку можно бесплатно, никаких платёжных данных мы не просим. Стоимость будущего приложения и условия пилота пока не объявлены. Их команда сообщит до начала участия."],
  ["Как удалить заявку?", "Напишите @DuImaran в Telegram и укажите имя пользователя, которое оставляли в анкете. Команда сможет найти вашу заявку, изменить её или удалить и прекратить дальнейшую связь."],
];

function PrivacyDialog({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => { ref.current?.showModal(); }, []);
  return <dialog ref={ref} className="privacy-dialog" aria-labelledby="privacy-heading" onClose={onClose} onClick={e => { if (e.target === e.currentTarget) ref.current?.close(); }}>
    <button className="dialog-close icon-button" aria-label="Закрыть" onClick={() => ref.current?.close()}><X size={22} /></button><span className="eyebrow">Заявка на тестирование</span><h2 id="privacy-heading">О ваших данных</h2>
    <p>Команда проекта «ИИ-стилист» сохраняет имя, возрастную группу, Telegram и телефон, если вы его указали, для связи по поводу закрытого тестирования. Можно дополнительно сообщить тип устройства, интересующую задачу и выбранный маршрут.</p>
    <p>Маршрут прикрепляется только с вашего отдельного согласия в форме. Фотографии посетителей на лендинг не загружаются. Данные заявки доступны владельцу проекта и не публикуются на сайте.</p>
    <p>Мы считаем открытия страницы, использование примера, скачивания маршрута и отправленные заявки. Эти счётчики не содержат имени, Telegram или личного маршрута и не являются числом уникальных людей. Для защиты от частых запросов временно используется хеш сетевого адреса.</p>
    <p>Чтобы изменить или удалить заявку и отозвать согласие на дальнейшую связь, напишите команде в Telegram: <a href="https://t.me/DuImaran" target="_blank" rel="noreferrer">@DuImaran <Arrow /></a>. До приглашения команда уточнит условия тестирования.</p><p className="muted small">Версия от 12 ноября 2026 года.</p>
  </dialog>;
}

function BetaForm({ route }: { route: string | null }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [error, setError] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [name, setName] = useState("");
  const [attach, setAttach] = useState(false);
  const errorRef = useRef<HTMLParagraphElement>(null);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setStatus("sending");
    const data = new FormData(event.currentTarget);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch("/api/applications", { method: "POST", signal: controller.signal, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: data.get("name"), ageGroup: data.get("ageGroup"), telegram: data.get("telegram"), phone: data.get("phone") || "", website: data.get("website"), consent: data.get("consent") === "on", platform: data.get("platform") || null, priority: data.get("priority") || null, routeSummary: attach && route ? route : null }) });
      if (!response.headers.get("content-type")?.includes("application/json")) throw new Error("Сервис пока недоступен. Обновите страницу или напишите команде в Telegram.");
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || "Не удалось отправить заявку. Попробуйте ещё раз.");
      setName(String(data.get("name")).trim()); setStatus("success");
    } catch (e) {
      setError(e instanceof Error && e.name === "AbortError" ? "Ответ занял слишком много времени. Попробуйте ещё раз: повторная заявка не создаст дубликат." : e instanceof TypeError ? "Нет соединения. Проверьте интернет и попробуйте ещё раз." : e instanceof Error ? e.message : "Не удалось отправить заявку. Попробуйте ещё раз.");
      setStatus("idle"); setTimeout(() => errorRef.current?.focus(), 0);
    } finally { clearTimeout(timeout); }
  }
  return <>
    {status === "success" ? <div className="form-success" role="status" aria-live="polite"><span className="success-mark"><Check size={30} strokeWidth={1.3} /></span><span className="eyebrow">Заявка сохранена</span><h3>{name}, познакомились.</h3><p>Вы в списке заявок. Когда будем формировать пилотную группу, напишем в указанный Telegram и уточним детали. Дата пока не объявлена.</p><div className="next-step"><strong>Пока можно сохранить маршрут</strong><p>Вернитесь к примеру выше: его карточка скачивается без регистрации.</p></div><a className="text-link" href="https://t.me/DuImaran" target="_blank" rel="noreferrer">Задать вопрос команде <Arrow /></a></div> : <form onSubmit={submit} className="beta-form">
      <div className="form-topline"><span>АНКЕТА ЗНАКОМСТВА</span><span>ОБЯЗАТЕЛЬНО: ИМЯ, ВОЗРАСТ, TELEGRAM</span></div>
      <div className="form-row"><label>Ваше имя<input name="name" autoComplete="given-name" placeholder="Как к вам обращаться" minLength={2} maxLength={60} required /></label><label>Возраст<span className="select-wrap"><select name="ageGroup" defaultValue="" required><option value="" disabled>Возрастная группа</option>{["До 18", "18–24", "25–34", "35–44", "45+"].map(age => <option key={age}>{age}</option>)}</select><ChevronDown size={15} aria-hidden="true" /></span></label></div>
      <label>Telegram<input name="telegram" autoComplete="off" placeholder="@username или t.me/username" required maxLength={80} spellCheck={false} aria-describedby="telegram-help" /></label><p id="telegram-help" className="field-hint">Укажите публичное имя пользователя из настроек Telegram. По нему команда сможет написать вам.</p>
      <details className="optional-fields"><summary>Добавить устройство, задачу или телефон<span>необязательно</span><Plus size={16} aria-hidden="true" /></summary><div><label>Ваше устройство<span className="select-wrap"><select name="platform" defaultValue=""><option value="">Не указывать</option><option value="android">Android</option><option value="ios">iPhone</option><option value="both">Использую оба</option></select><ChevronDown size={15} aria-hidden="true" /></span></label><label>Что хочется решить в первую очередь<span className="select-wrap"><select name="priority" defaultValue=""><option value="">Не указывать</option><option value="daily">Проще выбирать одежду утром</option><option value="wardrobe">Найти сочетания забытых вещей</option><option value="day-route">Одеться на весь день с разными планами</option></select><ChevronDown size={15} aria-hidden="true" /></span></label><label>Телефон<input name="phone" type="tel" autoComplete="tel" placeholder="+7 999 123-45-67" maxLength={24} /></label></div></details>
      {route && <label className="consent attach-route"><input type="checkbox" checked={attach} onChange={e => setAttach(e.target.checked)} /><span>Прикрепить выбранный маршрут к заявке, чтобы команда знала, какой сценарий мне интересен.</span></label>}
      <div className="honeypot" aria-hidden="true"><label>Ваш сайт<input name="website" tabIndex={-1} autoComplete="off" /></label></div><div className="consent"><input id="consent" name="consent" type="checkbox" required /><label htmlFor="consent">Согласен на использование указанных данных для связи по поводу закрытого тестирования. <button type="button" className="inline-link" onClick={() => setPrivacy(true)}>Как используются данные</button></label></div>
      {error && <p ref={errorRef} tabIndex={-1} className="form-error" role="alert">{error}</p>}<button className="button button-dark submit-button" disabled={status === "sending"} type="submit">{status === "sending" ? "Сохраняем заявку…" : "Оставить заявку на тестирование"}<Arrow /></button><p className="form-footnote">Заявка бесплатна. Срок и условия участия сообщим лично.</p>
    </form>}{privacy && <PrivacyDialog onClose={() => setPrivacy(false)} />}
  </>;
}

export default function Landing() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [route, setRoute] = useState<string | null>(null);
  const joinRef = useRef<HTMLElement>(null);
  useEffect(() => {
    track("page_view");
    const observer = new IntersectionObserver(entries => { if (entries.some(entry => entry.isIntersecting)) { track("form_view"); observer.disconnect(); } }, { threshold: .15 });
    if (joinRef.current) observer.observe(joinRef.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => { if (!mobileMenu) return; const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setMobileMenu(false); }; window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); }, [mobileMenu]);
  return <>
    <a className="skip-link" href="#main">К содержимому</a><header className="site-header wrap"><a href="#" className="wordmark" aria-label="ИИ-стилист — на главную"><LabelMark /><span>ИИ<span className="brand-dot">.</span>стилист</span></a><nav id="mobile-navigation" className={mobileMenu ? "main-nav is-open" : "main-nav"} aria-label="Основная навигация"><a href="#how" onClick={() => setMobileMenu(false)}>Как работает</a><a href="#wardrobe-lab" onClick={() => setMobileMenu(false)}>Маршрут дня</a><a href="#project" onClick={() => setMobileMenu(false)}>О проекте</a></nav><a className="header-cta" href="#join">В тестирование <Arrow /></a><button className="menu-toggle icon-button" aria-label={mobileMenu ? "Закрыть меню" : "Открыть меню"} aria-expanded={mobileMenu} aria-controls="mobile-navigation" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X size={24} /> : <Menu size={24} />}</button></header>
    <main id="main"><section className="hero wrap" aria-labelledby="hero-heading"><div className="hero-copy"><div className="launch-label"><span />Разрабатываем приложение для Android</div><h1 id="hero-heading">Один<br />гардероб.<br /><em>Весь ваш день.</em></h1><p className="hero-description">ИИ-стилист для образов из ваших вещей: с учётом погоды, встреч и всего, что случается между ними.</p><div className="hero-actions"><a className="button button-dark" href="#wardrobe-lab">Собрать маршрут дня <Arrow /></a><a className="hero-secondary" href="#join">Записаться в тестирование</a></div><p className="hero-note">Интерактивный пример без регистрации</p></div><div className="hero-visual"><div className="visual-topline"><span>ГАРДЕРОБНЫЙ АРХИВ / ЭСКИЗ 001</span><span>ОСНОВА ДНЯ</span></div><div className="hero-photo"><img src="/images/editorial-wardrobe.webp" width={1536} height={1024} alt="Образ из шоколадного жакета, молочной футболки, светлых брюк и лоферов; справа — отдельные вещи" fetchPriority="high" /><div className="photo-label"><LabelMark /><span>У каждой вещи<br /><strong>больше одной истории.</strong></span></div></div><div className="visual-caption"><span>Состав: жакет, футболка, брюки, лоферы.</span><span className="image-note">Иллюстрация концепции</span></div></div></section>
      <div className="editorial-divider wrap"><span>ВАШИ ВЕЩИ</span><span className="divider-thread" aria-hidden="true">————</span><span>ПЛАНЫ НА ДЕНЬ</span><span className="divider-thread" aria-hidden="true">————</span><span>ПОНЯТНЫЕ СОЧЕТАНИЯ</span><a href="#how" aria-label="Как работает приложение"><ArrowDown size={18} strokeWidth={1.3} /></a></div>
      <section className="intro-section wrap" id="how" aria-labelledby="how-heading"><div className="section-marker"><span>01 / СНАЧАЛА ВАШИ ВЕЩИ</span><span>ОДЕВАТЬСЯ ПОД СВОЮ ЖИЗНЬ</span></div><div className="intro-grid"><h2 id="how-heading">Сочетания<br />начинаются с вас.</h2><div className="intro-text"><p>Утром встреча, днём прогулка, вечером ужин. Хочется выглядеть уместно и взять с собой поменьше.</p><p className="muted">Стилист начинается с того, что вы носите. Мы хотим учитывать ваши планы и объяснять каждое предложение: почему эта вещь, что меняется и что можно оставить.</p></div></div><div className="steps">{[{ n: "01", title: "Небольшая капсула", text: "Начать с любимых вещей и постепенно собрать цифровой гардероб. Загружать весь шкаф сразу не требуется." }, { n: "02", title: "Ваши условия", text: "Отметить планы, погоду и вещь, с которой не хочется расставаться. Сохранить контроль над предложением." }, { n: "03", title: "Понятный маршрут", text: "Увидеть сочетания на день, объяснения изменений и список того, что понадобится дополнительно." }].map(step => <article className="step" key={step.n}><div className="step-top"><span>БИРКА {step.n}</span><span aria-hidden="true">↗</span></div><h3>{step.title}</h3><p>{step.text}</p></article>)}</div><p className="development-note">Это направление разработки. Ниже — пример на готовом гардеробе, который можно попробовать уже сейчас.</p></section>
      <WardrobeLab onRoute={setRoute} />
      <section className="project-section wrap" id="project" aria-labelledby="project-heading"><div className="section-marker"><span>03 / ЗА ПРОЕКТОМ СТОЯТ ЛЮДИ</span><span>ДЕЛАЕМ И ПРОВЕРЯЕМ ПОШАГОВО</span></div><div className="project-grid"><div><h2 id="project-heading">Люди и работа<br />за этим проектом.</h2><p className="project-description">Небольшая команда разрабатывает цифровой гардероб и исследует, как сделать подбор образов удобным в обычной жизни.</p><div className="team-credits"><p><span>Айназ Хайруллин</span><small>Приложение и серверная часть</small></p><p><span>Арина Коваленко</span><small>Обработка фотографий и рекомендации</small></p></div><a href="https://t.me/DuImaran" target="_blank" rel="noreferrer" className="text-link">Написать команде в Telegram <Arrow /></a></div><div className="project-progress"><article><span className="progress-dot complete" /><div><span className="eyebrow">ПРОВЕРЕНО В ПРОТОТИПЕ</span><h3>От фотографии к гардеробу</h3><p>Загрузка, предпросмотр и сохранение фото из Android-приложения.</p></div></article><article><span className="progress-dot current" /><div><span className="eyebrow">В РАЗРАБОТКЕ</span><h3>Распознавание вещей</h3><p>Выделение одежды на снимке и определение её характеристик.</p></div></article><article><span className="progress-dot" /><div><span className="eyebrow">ПРОВЕРИМ С УЧАСТНИКАМИ</span><h3>Персональные сочетания</h3><p>Качество рекомендаций, удобство первого гардероба и интерес к маршрутам дня.</p></div></article></div></div></section>
      <section ref={joinRef} className="join-section wrap" id="join" aria-labelledby="join-heading"><div className="join-copy"><span className="eyebrow">04 / ПЕРВЫЕ УЧАСТНИКИ</span><h2 id="join-heading">Следующий<br />маршрут —<br /><em>ваш.</em></h2><p>Приглашаем оставить заявку в закрытое тестирование. Нам важны разные гардеробы, привычки и мнения.</p><ol className="pilot-steps"><li><span>1</span>Вы оставляете контакт.</li><li><span>2</span>Команда уточняет устройство и условия.</li><li><span>3</span>Вы пробуете прототип и делитесь впечатлениями.</li></ol><p className="pilot-platform">Первая версия — Android.<br />Дата начала пилота пока не объявлена.</p></div><div className="form-container"><BetaForm route={route} /></div></section>
      <section className="faq-section wrap" id="faq" aria-labelledby="faq-heading"><div><span className="eyebrow">05 / ПЕРЕД ЗНАКОМСТВОМ</span><h2 id="faq-heading">То, что стоит<br />знать заране.</h2><a href="https://t.me/DuImaran" target="_blank" rel="noreferrer" className="text-link">Задать свой вопрос <Arrow /></a></div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<Plus size={19} strokeWidth={1.4} aria-hidden="true" /></summary><p>{answer}</p></details>)}</div></section>
    </main><footer className="site-footer wrap"><div className="footer-top"><a className="wordmark" href="#"><LabelMark /><span>ИИ<span className="brand-dot">.</span>стилист</span></a><p>Один гардероб.<br />Много продолжений.</p><a href="https://t.me/DuImaran" target="_blank" rel="noreferrer">@DuImaran <Arrow /></a></div><div className="footer-bottom"><span>© 2026 ИИ-стилист. Приложение в разработке.</span><button type="button" className="inline-link" onClick={() => setPrivacy(true)}>О данных заявки</button><a href="#" className="back-top">Наверх ↑</a></div></footer>{privacy && <PrivacyDialog onClose={() => setPrivacy(false)} />}
  </>;
}
