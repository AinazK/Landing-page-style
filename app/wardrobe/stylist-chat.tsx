export default function StylistChat() {
  return (
    <section className="stylist-chat-section wrap" id="stylist-chat" aria-labelledby="stylist-chat-heading">
      <div className="stylist-chat-copy">
        <span className="stylist-chat-kicker">ИИ-стилист рядом</span>
        <h2 id="stylist-chat-heading">Не знаете, что надеть?<br /><span>Спросите стилиста.</span></h2>
        <p>Объясните задачу своими словами. Чат поможет разобраться в сочетаниях из вашего гардероба.</p>
        <span className="stylist-chat-note">Готовим для веб-приложения</span>
      </div>

      <div className="stylist-chat-dialogue" aria-label="Иллюстрация будущего чата со стилистом">
        <div className="stylist-chat-topline"><span>Пример диалога</span><span className="stylist-chat-thread" aria-hidden="true">ИИ</span></div>
        <ol className="stylist-chat-messages">
          <li className="stylist-chat-user">
            <span className="stylist-chat-speaker">Вы</span>
            <p>После работы иду на ужин. Что надеть из моих вещей?</p>
          </li>
          <li className="stylist-chat-answer">
            <span className="stylist-chat-speaker">ИИ-стилист</span>
            <p>Белая футболка, тёмные брюки и шоколадный жакет — готовый комплект для ужина. Если вечером прохладно, возьмите плащ. Всё уже есть в вашем гардеробе.</p>
            <span className="stylist-chat-context">Совет с опорой на ваши вещи</span>
          </li>
        </ol>
      </div>
    </section>
  );
}
