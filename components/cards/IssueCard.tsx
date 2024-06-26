// Import classNames from 'classnames' instead of 'uploadthing/client'
import { classNames } from 'uploadthing/client'; 
import Link from 'next/link';
import Image from 'next/image';
import { formatDateString } from '@/lib/utils';

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    name: string;
    image: string;
    id: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
}

const IssueCard = ({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
}: Props) => {
  return (
    <article className={`flex w-full flex-col rounded-xl p-7 ${isComment ? 'px-0 xs:px-7' : 'bg-dark-2'}`}>
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              {/* Use <img> tag for profile image */}
              <img
                src={author.image}
                alt="Profile image"
                className="cursor-pointer rounded-full"
              />
            </Link>
            <div className="issue-card_bar" />
          </div>
          <div className="flex w-full flex-col">
            <Link href={`/profile/${author.id}`} className="w-fit">
              <h4 className="cursor-pointer text-base-semibold text-light-1">{author.name}</h4>
            </Link>
            <p className="mt-2 text-small-regular text-light-2">
              {content}
            </p>
            {/* Render like, reply, repost, and share icons */}
            <div className='flex gap-3.5 mt-2'>
                <Image
                  src='/assets/heart-gray.svg'
                  alt='like'
                  width={24}
                  height={24}
                  className='cursor-pointer object-contain'
                />
                <Link href={`/issue/${id}`}>
                  <Image
                    src='/assets/reply.svg'
                    alt='reply'
                    width={24}
                    height={24}
                    className='cursor-pointer object-contain'
                  />
                </Link>
                <Image
                  src='/assets/repost.svg'
                  alt='repost'
                  width={24}
                  height={24}
                  className='cursor-pointer object-contain'
                />
                <Image
                  src='/assets/share.svg'
                  alt='share'
                  width={24}
                  height={24}
                  className='cursor-pointer object-contain'
                />
              </div>
            {/* Render number of comments */}
            {isComment && comments.length > 0 && (
              <Link href={`/issue/${id}`}>
                <p className="mt-1 text-subtle-medium text-gray-1">
                  {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                </p>
              </Link>
            )}
          </div>
        </div>
      </div>
      {/* Render additional content if not a comment */}
      {!isComment && comments.length > 0 && (
        <div className="ml-1 mt-3 flex items-center gap-2">
          {comments.slice(0, 2).map((comment, index) => (
            <img
              key={index}
              src={comment.author.image}
              alt={`user_${index}`}
              width={24}
              height={24}
              className={`${index !== 0 && "-ml-5"} rounded-full object-cover`}
            />
          ))}
          <Link href={`/issue/${id}`}>
            <p className="mt-1 text-subtle-medium text-gray-1">
              {comments.length} repl{comments.length > 1 ? "ies" : "y"}
            </p>
          </Link>
        </div>
      )}
      {/* Render community info if available */}
      {!isComment && community && (
        <Link href={`/communities/${community.id}`} className="mt-5 flex items-center">
          <p className="text-subtle-medium text-gray-1">
            {formatDateString(createdAt)} - {community.name} Community
          </p>
          <img
            src={community.image}
            alt={community.name}
            width={14}
            height={14}
            className="ml-1 rounded-full object-cover"
          />
        </Link>
      )}
    </article>
  );
};

export default IssueCard;
