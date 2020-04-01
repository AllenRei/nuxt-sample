const ActionBuilder = (type, author, data) => {
  return global.model.action.create({
    createdAt: Date.now(),
    type,
    author,
    data
  });
}

export const TransactionsBuilder = (author, args) => ActionBuilder('transaction', author, args)

export const TransferBuilder = (author, args) => ActionBuilder('transfer', author, args)

export const CommentBuilder = (author, args) => ActionBuilder('comment', author, args)

export const ChangeBuilder = (author, args) => ActionBuilder('change', author, args)
