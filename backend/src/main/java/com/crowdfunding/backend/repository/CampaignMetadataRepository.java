package com.crowdfunding.backend.repository;

import com.crowdfunding.backend.entity.CampaignMetadata;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CampaignMetadataRepository extends JpaRepository<CampaignMetadata, Long> {
    Optional<CampaignMetadata> findByOnChainId(Long onChainId);
}
