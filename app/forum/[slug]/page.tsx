
import ChatForum from '@/components/ChatForum';

export default function Page({ params }) {
    const slug = params.slug

    return <ChatForum slug={slug} />
}
