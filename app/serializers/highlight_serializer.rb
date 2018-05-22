class HighlightSerializer < ActiveModel::Serializer
  attributes :id, :uid, :target, :document_id, :document_title, :excerpt, :color
  has_many :links_to, serializer: LinkableSerializer
end
