<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use App\Model\Reply;
use Illuminate\Notifications\Messages\BroadcastMessage;
use App\Http\Resources\ReplyResource;


class NewReplyNotification extends Notification
{
    use Queueable;
    public $reply;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Reply $reply)
    {
        echo 'reply CONSTRUCT!';die;

        $this->reply = $reply;

    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['database','broadcast'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
 /*   public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->line('The introduction to the notification.')
                    ->action('Notification Action', url('/'))
                    ->line('Thank you for using our application!');
    }
*/
    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            'replyBy'   => $this->reply->user->name,
            'question'  => $this->reply->question->title,
            'path'      => $this->reply->question->path,
        ];
    }

    public function toBroadcast($notifiable) {
        return new BroadcastMessage([
            'replyBy'   => $this->reply->user->name,
            'question'  => $this->reply->question->title,
            'path'      => $this->reply->question->path,
            'reply'     => new ReplyResource($this->reply)
        ]);
    }
}
