export function PackCard({imageUrl}: {
    imageUrl: string;
}) {
    return <div className="border rounded">
      <img src={imageUrl}/>
    </div>
}