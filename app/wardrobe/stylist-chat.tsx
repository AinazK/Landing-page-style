export default function StylistChat() {
  return (
    <section className="stylist-chat-section wrap" id="stylist-chat" aria-labelledby="stylist-chat-heading">
      <div className="stylist-chat-copy">
        <span className="stylist-chat-kicker">ИИ-стилист рядом</span>
        <h2 id="stylist-chat-heading">Не знаете, что надеть?<br /><span>Спросите стилиста.</span></h2>
        <p>Спросите про образ на вечер или капсулу для поездки. Чат поможет выбрать сочетающиеся вещи из вашего гардероба.</p>
        <span className="stylist-chat-note">Готовим для веб-приложения</span>
      </div>

      <div className="stylist-chat-dialogue" aria-label="Иллюстрация будущего чата со стилистом">
        <div className="stylist-chat-topline"><span>Пример диалога</span><span className="stylist-chat-thread" aria-hidden="true">ИИ</span></div>
        <ol className="stylist-chat-messages">
          <li className="stylist-chat-user">
            <span className="stylist-chat-speaker">Вы</span>
            <p>Еду на три дня: прогулки и ужин с друзьями. Обещают +12° и дождь. Что взять из моих вещей?</p>
          </li>
          <li className="stylist-chat-answer">
            <span className="stylist-chat-speaker">ИИ-стилист</span>
            <p>Возьмите белую футболку, тёмные брюки и удобные кеды. Добавьте жакет для ужина и плащ для дождя. Эти вещи сочетаются между собой — получится капсула на поездку.</p>
            <span className="stylist-chat-context">Капсула из вашего гардероба</span>
          </li>
        </ol>
      </div>
    </section>
  );
}
