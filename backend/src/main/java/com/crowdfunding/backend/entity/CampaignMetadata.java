package com.crowdfunding.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Data
@Table(name = "campaign_metadata")
public class CampaignMetadata {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    @NotNull(message = "On-chain id is required")
    @PositiveOrZero(message = "On-chain id must be zero or positive")
    private Long onChainId;

    @Column(length = 2000)
    @Size(max = 2000, message = "Detailed description must be at most 2000 characters")
    private String detailedDescription;

    @Size(max = 100, message = "Category must be at most 100 characters")
    private String category;

    @Size(max = 500, message = "Image URL must be at most 500 characters")
    private String imageUrl;
}
