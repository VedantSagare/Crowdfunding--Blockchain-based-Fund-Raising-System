package com.crowdfunding.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "campaign_metadata")
public class CampaignMetadata {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private Long onChainId;

    @Column(length = 2000)
    private String detailedDescription;

    private String category;
    private String imageUrl;
}
