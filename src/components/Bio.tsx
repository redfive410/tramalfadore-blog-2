import Image from 'next/image'

const Bio = () => {
  const author = {
    name: "Jimmy Armitage + AI",
    summary: "who live and work in San Diego building useful things."
  }
  const social = {
    twitter: "mrjimmy410"
  }

  return (
    <div className="bio">
      <Image
        className="bio-avatar"
        src="/images/profile-pic.png"
        width={50}
        height={50}
        alt="Profile picture"
      />
      {author?.name && (
        <p>
          Written by <strong>{author.name}</strong> {author?.summary || null}
          {` `}
          <a href={`https://twitter.com/${social?.twitter || ``}`}>
            You should follow them
          </a>
        </p>
      )}
    </div>
  )
}

export default Bio